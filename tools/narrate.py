#!/usr/bin/env python3
"""Narrate overview.mp4 with OpenAI text-to-speech.

    export OPENAI_API_KEY=...
    python3 tools/narrate.py synth [--voice nova]   # one clip per caption -> tools/_tts/<hash>.wav + durations.json
    python3 tools/build_overview.py build           # re-time the body so every caption window fits its narration
    python3 tools/narrate.py mux                    # place the clips at the caption times, mux into overview.mp4

Captions and their times come from tools/overview_captions.vtt (written by build_overview.py). Clips are cached by
(model, voice, instructions, text), so re-running synth after editing one caption only synthesizes that one.
A clip starts at its caption's start, or right after the previous clip if that one is still playing; the report
lists any clip that had to be delayed, which is where a caption is too long for its scene.
"""
import argparse
import hashlib
import json
import os
import subprocess
import sys
import urllib.request
import wave
from pathlib import Path

import numpy as np

HERE = Path(__file__).resolve().parent
PAGE = HERE.parent
TTS_DIR = HERE / "_tts"
VTT = HERE / "overview_captions.vtt"
VIDEO = PAGE / "static/videos/overview.mp4"
MODEL = "gpt-4o-mini-tts"
INSTRUCTIONS = ("Narration for a research project video about robot learning. Calm, clear, neutral documentary "
                "tone. Speak quickly, noticeably faster than a normal narration pace, with minimal pauses between "
                "phrases. No dramatic emphasis.")
GAP = 0.30          # s between the end of one clip and the start of the next
RATE = 24000        # OpenAI wav sample rate
TEMPO = 1.15        # pitch-preserving speed-up applied to every clip, on top of the 'speak quickly' instruction


def parse_vtt(path):
    cues, block = [], []
    for line in path.read_text().splitlines() + [""]:
        if line.strip():
            block.append(line)
            continue
        if len(block) >= 3 and "-->" in block[1]:
            a, b = block[1].split("-->")
            cues.append((hms(a), hms(b), " ".join(block[2:])))
        block = []
    return cues


def hms(s):
    h, m, sec = s.strip().split(":")
    return int(h) * 3600 + int(m) * 60 + float(sec)


def clip_path(text, voice):
    key = hashlib.sha1(f"{MODEL}|{voice}|{INSTRUCTIONS}|{text}".encode()).hexdigest()[:12]
    return TTS_DIR / f"{key}.wav"


def synth_one(text, voice, path):
    body = json.dumps({"model": MODEL, "voice": voice, "input": text, "instructions": INSTRUCTIONS,
                       "response_format": "wav"}).encode()
    req = urllib.request.Request("https://api.openai.com/v1/audio/speech", data=body, method="POST", headers={
        "Authorization": f"Bearer {os.environ['OPENAI_API_KEY']}", "Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=120) as r:
        path.write_bytes(r.read())


def duration(path):
    out = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(path)],
                         capture_output=True, text=True).stdout
    return float(out.strip())


def pcm(path):
    """Mono float32 samples at RATE."""
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", str(path), "-af", f"atempo={TEMPO}", "-f", "f32le",
                          "-ac", "1", "-ar", str(RATE), "-"], capture_output=True).stdout
    return np.frombuffer(raw, np.float32)


def trim(x, thresh=0.01, keep=0.08):
    """Cut leading/trailing silence, keeping `keep` seconds around the speech."""
    idx = np.nonzero(np.abs(x) > thresh)[0]
    if len(idx) == 0:
        return x
    a = max(0, idx[0] - int(keep * RATE))
    b = min(len(x), idx[-1] + int(keep * RATE))
    return x[a:b]


def f0_median(x, rate=RATE):
    """Median fundamental frequency (Hz) of the voiced frames, by autocorrelation; 0 if nothing voiced."""
    frame, hop = int(0.04 * rate), int(0.02 * rate)
    lo, hi = int(rate / 400), int(rate / 70)
    vals = []
    for s in range(0, len(x) - frame, hop):
        seg = x[s:s + frame]
        if np.sqrt(np.mean(seg ** 2)) < 0.02:
            continue
        seg = seg - seg.mean()
        ac = np.correlate(seg, seg, "full")[frame - 1:]
        if ac[0] <= 0:
            continue
        ac = ac / ac[0]
        lag = lo + int(np.argmax(ac[lo:hi]))
        if ac[lag] > 0.5:
            vals.append(rate / lag)
    return float(np.median(vals)) if vals else 0.0


F0_TOL = 0.18       # a clip whose pitch is this far (fraction) from the median of all clips is re-synthesized


def cmd_synth(args):
    assert os.environ.get("OPENAI_API_KEY"), "OPENAI_API_KEY is not set"
    TTS_DIR.mkdir(exist_ok=True)
    cues = parse_vtt(VTT)
    durations, meta = {}, {"model": MODEL, "voice": args.voice, "clips": {}}
    f0s = {}
    for i, (a, b, text) in enumerate(cues, 1):
        p = clip_path(text, args.voice)
        if not p.exists():
            print(f"[{i:2d}/{len(cues)}] synth: {text[:70]}", file=sys.stderr)
            synth_one(text, args.voice, p)
        x = trim(pcm(p))
        f0s[text] = f0_median(x)
        durations[text] = round(len(x) / RATE, 3)
        meta["clips"][text] = p.name
    if args.redo:                       # --redo "substring": 3 fresh takes of the matching lines, keep the one whose
        med = float(np.median([v for v in f0s.values() if v > 0]))      # pitch is closest to the other clips'
        for i, (a, b, text) in enumerate(cues, 1):
            if args.redo.lower() not in text.lower():
                continue
            p = clip_path(text, args.voice)
            best = (abs(f0s[text] - med), p.read_bytes(), f0s[text])
            for k in range(3):
                synth_one(text, args.voice, p)
                f = f0_median(trim(pcm(p)))
                print(f"[{i:2d}] take {k + 1}: f0 {f:.0f} Hz (had {f0s[text]:.0f}, median {med:.0f})", file=sys.stderr)
                if abs(f - med) < best[0]:
                    best = (abs(f - med), p.read_bytes(), f)
            p.write_bytes(best[1])
            x = trim(pcm(p))
            f0s[text] = f0_median(x)
            durations[text] = round(len(x) / RATE, 3)
    # the model's timbre occasionally drifts on a line (it can even sound like another voice): re-synthesize
    # clips whose pitch is far from the others'
    med = float(np.median([v for v in f0s.values() if v > 0]))
    for i, (a, b, text) in enumerate(cues, 1):
        tries = 0
        while abs(f0s[text] - med) / med > F0_TOL and tries < 4:
            tries += 1
            p = clip_path(text, args.voice)
            print(f"[{i:2d}] pitch {f0s[text]:.0f} Hz vs median {med:.0f} Hz -> re-synth (try {tries})",
                  file=sys.stderr)
            p.unlink()
            synth_one(text, args.voice, p)
            x = trim(pcm(p))
            f0s[text] = f0_median(x)
            durations[text] = round(len(x) / RATE, 3)
        d = durations[text]
        flag = "OVER" if d > b - a else "    "
        print(f"{i:2d}  {d:5.2f} s  window {b - a:5.2f} s  {flag}  f0 {f0s[text]:3.0f} Hz  {text[:70]}")
    (TTS_DIR / "durations.json").write_text(json.dumps(durations, indent=1, ensure_ascii=False))
    (TTS_DIR / "meta.json").write_text(json.dumps(meta, indent=1, ensure_ascii=False))
    print(f"\n{len(durations)} clips, {sum(durations.values()):.0f} s of speech -> {TTS_DIR / 'durations.json'}")
    print("Now rebuild the video (build_overview.py build) so the body windows fit, then run `mux`.")


def cmd_mux(args):
    cues = parse_vtt(VTT)
    meta = json.loads((TTS_DIR / "meta.json").read_text())
    video_len = duration(VIDEO)
    track = np.zeros(int((video_len + 1) * RATE), np.float32)
    t_end, delayed = 0.0, []
    print(f"{'#':>2}  {'cue':>8}  {'start':>8}  {'drift':>6}  {'len':>5}  {'window':>6}  caption")
    for i, (a, b, text) in enumerate(cues, 1):
        name = meta["clips"].get(text)
        assert name, f"no clip for caption {i} (run synth after editing captions): {text}"
        x = trim(pcm(TTS_DIR / name))
        start = max(a, t_end + GAP if t_end else a)
        s0 = int(start * RATE)
        track[s0:s0 + len(x)] += x[: len(track) - s0]
        t_end = start + len(x) / RATE
        drift = start - a
        if drift > 0.05:
            delayed.append((i, drift))
        print(f"{i:2d}  {a:8.2f}  {start:8.2f}  {drift:+6.2f}  {len(x) / RATE:5.2f}  {b - a:6.2f}  {text[:60]}")
    peak = float(np.abs(track).max())
    if peak > 0.98:
        track *= 0.98 / peak
    wav = TTS_DIR / "narration.wav"
    with wave.open(str(wav), "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(RATE)
        w.writeframes((track * 32767).astype(np.int16).tobytes())
    tmp = VIDEO.with_name("overview_narrated.tmp.mp4")
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", str(VIDEO), "-i", str(wav), "-map", "0:v", "-map", "1:a",
                    "-c:v", "copy", "-c:a", "aac", "-b:a", "160k", "-shortest", "-movflags", "+faststart", str(tmp)],
                   check=True)
    os.replace(tmp, VIDEO)
    print(f"\n{VIDEO}: narration muxed ({t_end:.1f} s of speech ends, video {video_len:.1f} s)")
    if delayed:
        print("delayed clips (caption longer than its scene; shorten the text or widen the window):")
        for i, d in delayed:
            print(f"  #{i}: starts {d:.2f} s after its caption")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("mode", choices=["synth", "mux"])
    ap.add_argument("--voice", default="nova")
    ap.add_argument("--redo", help="synth: re-take the lines containing this text, keeping the take whose pitch "
                                   "matches the other clips best")
    args = ap.parse_args()
    (cmd_synth if args.mode == "synth" else cmd_mux)(args)


if __name__ == "__main__":
    main()
