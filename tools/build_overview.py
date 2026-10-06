#!/usr/bin/env python3
"""Build static/videos/overview.mp4 for the project page.

    intro card (title, authors)
  + hero teaser (static/videos/teaser.mp4, 31.5 s) with the abstract's sentences in the band
  + FULLP_v5a_long_text.mp4 (3:35) with its small pill captions erased and a white caption band added below;
    scenes whose caption is short are sped up (see READ_* / MAX_SPEED) so the video does not idle
  + simulation results, one screen per task (human video + 4 embodiments)
  + real-robot results (UR3 + Wuji 1; the clips the page already has)
  + end card

The canvas is 1920 x (1080 + BAND): the source frame on top, a white band with the subtitle below.
Captions (text + timing) are the CAPTIONS / TEASER_CAPTIONS tables below; edit them and rebuild. The final cue
sheet (output times, speeds) is written to tools/overview_captions.md and tools/overview_captions.vtt.

    python3 tools/build_overview.py cues                        # just the cue sheet / plan (no render)
    python3 tools/build_overview.py probe 5 20 100 160 200      # PNG of the output frame at these seconds -> tools/_probe/
    python3 tools/build_overview.py build [--fast] [--out PATH]  # full render (--fast = x264 preset medium)

Needs ffmpeg on PATH, numpy, Pillow. The pikachu bundle is expected next to this repo (--bundle to change).
"""
import argparse
import json
import math
import os
import subprocess
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont

HERE = Path(__file__).resolve().parent
PAGE = HERE.parent
W, H0, BAND = 1920, 1080, 160
H = H0 + BAND
FPS = 30
WHITE = (255, 255, 255)
INK = (28, 28, 28)
GREY = (110, 110, 110)

# ----------------------------------------------------------------------------- intro card
INTRO_SECONDS, END_SECONDS = 8.0, 6.0      # intro grows to fit its narration (see intro_seconds)
INTRO_CAPTION = ("We introduce Dex-One2Many, a framework that learns generalizable dexterous manipulation "
                 "from a single human video.")
TITLE = "Dex-One2Many"
SUBTITLE = "Learning Dexterous Manipulation from a Single Human Demonstration"
AUTHOR_LINES = [
    "Jusuk Lee¹*,  Sungha Kim¹*,  Yeonsoo Park¹*,  Jonguk Cheon¹,  Yoonkyo Jung²,  Yongjun You¹,",
    "H. Jin Kim¹,  Jia-Bin Huang²,  Furong Huang²,  Youngseok Jang³†,  Seungjae Lee²†",
]
AFFIL_LINE = ("¹ Seoul National University     ² University of Maryland, College Park     "
              "³ Korea Advanced Institute of Science and Technology")
NOTE_LINE = "* Equal contribution     † Equal advising"

# ----------------------------------------------------------------------------- teaser (static/videos/teaser.mp4)
# Its own phases (s): 0-2 montage of the five tasks, 3-7 'One human video' (hammer), 8-13 'Many configurations not
# shown in the video', 14-21 'Any dexterous hands' (Wuji 1/2, then Allegro/Sharpa), 22-31 zoom-out to the montage.
# The band gives the idea in plain words, one line per phase.
TEASER_SECONDS = 31.5
TEASER_CAPTIONS = [
    (0.40, 4.80, "The only demonstration is a single human video of the task."),
    (5.00, 13.60, "Instead of imitating the demonstrated motion, we extract the task structure, "
                  "so poses, goals, and grasps may differ from the video."),
    (13.90, 21.50, "The same task structure trains any dexterous hand; only the robot model and its grasp set change."),
    (21.80, 31.00, "Policies are trained entirely in simulation and deployed zero-shot on a real robot. "
                   "Here is how it works."),
]

# ----------------------------------------------------------------------------- body captions (body source time, s)
# Windows of #4-#32 = the fade-in start / fade-out end of the pill captions of FULLP_v5a_long (tts_script.md),
# so each subtitle sits exactly on the scene it describes. The first three cover Part 2, which had no caption.
CAPTIONS = [
    (0.30, 4.60, "The input is a single human video of the task."),
    (4.70, 12.40, "A vision-language model abstracts it into stage-wise scene graphs: "
                  "which hand–object and object–object relations must hold, and in what order."),
    (12.60, 15.90, "Object poses, goal poses, and grasps are left free."),
    # M2: Stage-3 reset generation
    (16.03, 22.27, "Each stage graph serves as a generative constraint for sampling reset states; here, Stage 3."),
    (22.37, 28.03, "First, the anchor object, the pot, is placed anywhere in the workspace."),
    (28.13, 34.57, "Then Pikachu is sampled where the pre-inside predicate holds, near the pot."),
    (34.63, 43.53, "For the grasp predicate, the hand is placed at one of many synthesized multi-finger grasps, "
                   "each with a verified closing command."),
    (43.63, 49.30, "Each sampled state is instantiated in simulation and kept only if it is collision-free and stable."),
    (49.40, 62.90, "Repeating this yields many reset states from one graph: different pot positions, object poses, "
                   "and grasps that all satisfy the same relations."),
    # S1
    (64.30, 73.67, "The same procedure is applied to every stage, from the empty-hand start to the goal, "
                   "reproducing the video's graph sequence in simulation."),
    (73.77, 79.53, "Ten thousand verified states per stage form the initial-state distribution."),
    # H31
    (81.17, 87.90, "The graph is embodiment-agnostic: only the robot model and its grasp set are swapped."),
    (89.43, 95.27, "Four arm–hand embodiments share one task specification."),
    # RLT
    (95.90, 101.87, "RL episodes start uniformly from the reset states of every stage, "
                    "in tens of thousands of parallel environments."),
    (101.90, 107.87, "For visualization, the environments are arranged in rows by the stage their episode "
                     "starts from, Stage 4 at the top and Stage 0 at the bottom."),
    (107.90, 114.30, "Training from stage-wise resets proceeds as follows."),
    (114.33, 120.10, "With dense predicate rewards, the stages nearest the goal are learned first."),
    (120.13, 125.93, "Success then propagates backward, since the later stages are already solved."),
    (125.97, 131.93, "Eventually the full task is solved from the empty-hand start, stage 0."),
    (131.97, 138.33, "In ablations, removing stage-wise resets drops success from over 90 % to about 16 %."),
    (138.37, 144.47, "The same procedure trains all four embodiments; each learns the full task."),
    (144.50, 150.40, "The trained policy completes the task from an empty hand."),
    # RLE
    (152.60, 158.23, "We evaluate on 500 episodes per embodiment, with initial and goal positions "
                     "sampled across the workspace."),
    (158.37, 169.83, "No grasp is retargeted from the video; the policy adopts different grasp types "
                     "depending on where the object is."),
    # 169.97-203.47 (Sharpa mosaic, Wuji 2 / Allegro / UR3 representatives) is left out, see CUTS
    (203.60, 208.83, "The other embodiments are evaluated the same way; across five tasks, "
                     "the four average about 95 % success."),
    (208.93, 214.90, "Each embodiment learns its own grasps for the same task structure, from the same single video."),
]

# Source ranges of the body to leave out, (t0, t1) in body seconds. A caption window that overlaps a cut is clipped
# to the part that remains (dropped if less than 0.5 s is left). A short white dip hides each cut.
CUTS = [(169.60, 203.55)]   # from the end of the Sharpa representatives (before its mosaic forms) to the UR3 mosaic

# Speed-up rule for the body: a caption needs READ_BASE + words / READ_WPS seconds on screen; if its window in the
# source is longer, that window plays faster (frames are skipped), up to MAX_SPEED. Gaps between captions play at 1x.
# With a narration (tools/narrate.py synth -> tools/_tts/durations.json) a caption needs at least its clip + NARR_PAD;
# a scene whose narration is longer than its source window is slowed down (frames repeat), down to MIN_SPEED.
READ_BASE, READ_WPS, MAX_SPEED, MIN_SPEED, NARR_PAD = 1.0, 2.8, 2.0, 0.6, 0.6

# Pill captions baked into the text version: (band, pill width px, fade-in start, fade-out end), in order.
# band A = under the sim viewport (centre x 1180, y 868-916), B = bottom (centre x 960, y 1004-1048).
# Source: scripts/project_video/part3_v4_capmeasure.py (BANDS, CAPS) and FULLP_v5a_long/tts_script.md.
BANDS = {"A": (560, 1800, 868, 916, 1180), "B": (240, 1680, 1004, 1048, 960)}
PILLS = [
    ("A", 736, 16.03, 22.27), ("A", 587, 22.37, 28.03), ("A", 726, 28.13, 34.57), ("A", 601, 34.63, 43.53),
    ("A", 592, 43.63, 49.30), ("A", 554, 49.40, 62.90), ("B", 738, 64.30, 73.67), ("B", 524, 73.77, 79.53),
    ("A", 483, 81.17, 87.90), ("B", 501, 89.43, 95.27), ("B", 708, 95.90, 101.87), ("B", 556, 101.90, 107.87),
    ("B", 616, 107.90, 114.30), ("B", 571, 114.33, 120.10), ("B", 650, 120.13, 125.93), ("B", 539, 125.97, 131.93),
    ("B", 595, 131.97, 138.33), ("B", 513, 138.37, 144.47), ("B", 622, 144.50, 150.40), ("B", 562, 152.60, 158.23),
    ("B", 710, 158.37, 169.83), ("B", 420, 169.97, 175.97), ("B", 547, 176.10, 181.57), ("B", 420, 181.70, 186.93),
    ("B", 547, 187.03, 192.60), ("B", 420, 192.73, 197.97), ("B", 547, 198.10, 203.47), ("B", 420, 203.60, 208.83),
    ("B", 587, 208.93, 214.90),
]

# ----------------------------------------------------------------------------- outro material
# Table 2 of the paper: success (%) over 500 episodes, columns = EMBODIMENTS order.
EMBODIMENTS = [("ur3_wuji1", "UR3 + Wuji 1"), ("ur5e_sharpa", "UR5e + Sharpa Wave"),
               ("ur5e_wuji2", "UR5e + Wuji 2"), ("ur5e_allegro", "UR5e + Allegro")]
SIM_TASKS = [
    # key, title, category, human clip (relative to static/videos), success rates, band caption
    ("doll", "Doll", "direct manipulation", "one2many_human.mp4", (88.4, 98.4, 97.2, 97.2),
     "In simulation, each task is learned from one human video for four arm–hand embodiments — "
     "only the robot model and its grasp set change."),
    ("can", "Can", "direct manipulation", "sim/can_human.mp4", (93.6, 97.4, 95.2, 92.2),
     "Direct manipulation: grasp the object and move it to the target configuration."),
    ("stamp", "Stamp", "direct manipulation", "sim/stamp_human.mp4", (98.6, 96.6, 97.0, 98.8),
     "Success rates over 500 episodes per task, with initial object positions sampled across the workspace."),
    ("hammer", "Hammer", "tool use", "sim/hammer_human.mp4", (94.6, 94.2, 97.6, 91.8),
     "Tool use: grasp a tool and act on another object — the same predicate rewards, no task-specific design."),
    ("sweep", "Sweep", "tool use", "sim/sweep_human.mp4", (98.0, 96.6, 97.0, 100.0),
     "Across five tasks, the four embodiments average 94.6–96.8 % success."),
]
SIM_SECONDS = 8.0          # per task, at least; the 16 s clips finish the task by ~5 s and then hold
REAL_TASKS = [("Doll", ["one2many_config_1.mp4", "one2many_config_2.mp4"]),
              ("Can", ["real/can_1.mp4", "real/can_2.mp4"]),
              ("Stamp", ["real/stamp_1.mp4", "real/stamp_2.mp4"])]
REAL_SECONDS = 9.0         # at least
REAL_CAPTION = ("Zero-shot sim-to-real on UR3 + Wuji 1. On configurations never shown in the video: "
                "60–85 % success, where the baselines stay at or below 15 %.")
SCREEN_PAD = 0.8           # a fixed screen lasts at least its narration + this (narrate.py leaves 0.3 s between clips)


def screen_seconds(base, caption):
    """Length of a fixed screen (intro, sim task, real): at least `base`, and long enough for its narration."""
    return max(base, narration_durations().get(caption, 0.0) + SCREEN_PAD)


def intro_seconds():
    return screen_seconds(INTRO_SECONDS, INTRO_CAPTION)


def sim_seconds(caption):
    return screen_seconds(SIM_SECONDS, caption)


def real_seconds():
    return screen_seconds(REAL_SECONDS, REAL_CAPTION)


# ----------------------------------------------------------------------------- helpers
def font(size, bold=False):
    name = "NimbusSans-Bold.otf" if bold else "NimbusSans-Regular.otf"
    for d in (FONTS_DIR, Path("/usr/share/fonts/opentype/urw-base35")):
        p = d / name
        if p.exists():
            return ImageFont.truetype(str(p), size)
    raise FileNotFoundError(name)


def wrap(text, f, max_w):
    """Greedy wrap; a two-line result is re-split at the word boundary that balances the two lines."""
    words = text.split(" ")
    lines, cur = [], ""
    for w in words:
        t = (cur + " " + w).strip()
        if f.getlength(t) <= max_w or not cur:
            cur = t
        else:
            lines.append(cur)
            cur = w
    lines.append(cur)
    if len(lines) == 2:
        best = None
        for i in range(1, len(words)):
            a, b = " ".join(words[:i]), " ".join(words[i:])
            wa, wb = f.getlength(a), f.getlength(b)
            if max(wa, wb) <= max_w and (best is None or abs(wa - wb) < best[0]):
                best = (abs(wa - wb), [a, b])
        if best:
            lines = best[1]
    return lines


_band_cache = {}


def band_image(text):
    """RGBA band (W x BAND) with the subtitle centred; cached by text."""
    if text in _band_cache:
        return _band_cache[text]
    f = font(42)
    im = Image.new("RGBA", (W, BAND), (255, 255, 255, 0))
    d = ImageDraw.Draw(im)
    lines = wrap(text, f, 1760)
    lh = 52
    y = BAND / 2 - lh * (len(lines) - 1) / 2
    for ln in lines:
        d.text((W / 2, y), ln, font=f, fill=INK + (255,), anchor="mm")
        y += lh
    arr = np.asarray(im, np.float32)
    _band_cache[text] = (arr[..., :3], arr[..., 3:4] / 255.0)
    return _band_cache[text]


def fade(t, t0, t1, ramp=0.25):
    """0..1 alpha of a caption at time t for a window [t0, t1] with linear ramps."""
    if t < t0 or t > t1:
        return 0.0
    return max(0.0, min(1.0, (t - t0) / ramp, (t1 - t) / ramp))


def caption_at(captions, t):
    for t0, t1, s in captions:
        al = fade(t, t0, t1)
        if al > 0:
            return s, al
    return None, 0.0


def put_band(canvas, text, alpha):
    if alpha <= 0:
        return
    rgb, a = band_image(text)
    a = a * alpha
    band = canvas[H0:].astype(np.float32)
    canvas[H0:] = (band * (1 - a) + rgb * a).astype(np.uint8)


class Clip:
    """Frames of a video through an ffmpeg rawvideo pipe; after the end, the last frame is held (or looped)."""

    def __init__(self, path, size=None, fps=FPS, speed=1.0, seek=None, loop=False):
        self.w, self.h = size or probe_size(path)
        vf = []
        if speed != 1.0:
            vf.append(f"setpts={1 / speed:.6f}*PTS")
        if size:
            vf.append(f"scale={self.w}:{self.h}")
        vf.append(f"fps={fps}")
        cmd = ["ffmpeg", "-v", "fatal", "-nostdin"]      # fatal: no 'broken pipe' noise when a clip is closed early
        if seek is not None:
            cmd += ["-ss", f"{seek:.4f}"]
        cmd += ["-i", str(path), "-vf", ",".join(vf), "-f", "rawvideo", "-pix_fmt", "rgb24", "-"]
        self.cmd, self.loop = cmd, loop
        self._open()
        self.last = None

    def _open(self):
        self.p = subprocess.Popen(self.cmd, stdout=subprocess.PIPE, bufsize=self.w * self.h * 3 * 4)

    def __next__(self):
        n = self.w * self.h * 3
        buf = self.p.stdout.read(n)
        if len(buf) < n:
            if self.loop and self.last is not None:
                self.close()
                self._open()
                buf = self.p.stdout.read(n)
            if len(buf) < n:
                if self.last is None:
                    raise RuntimeError(f"no frames from {self.cmd}")
                return self.last
        self.last = np.frombuffer(buf, np.uint8).reshape(self.h, self.w, 3)
        return self.last

    def skip(self, k):
        """Drop k frames (used by the sped-up body)."""
        n = self.w * self.h * 3
        for _ in range(k):
            if len(self.p.stdout.read(n)) < n:
                break

    def close(self):
        try:
            self.p.stdout.close()
            self.p.kill()
            self.p.wait()
        except Exception:
            pass


def probe_size(path):
    out = subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries",
                          "stream=width,height", "-of", "csv=p=0", str(path)], capture_output=True, text=True).stdout
    w, h = out.strip().split(",")[:2]
    return int(w), int(h)


def card(title, lines, title_size=120, gap=36):
    """A white 1920x1080 card: big bold title, then (size, text[, color, extra_gap]) lines; returns RGB array."""
    im = Image.new("RGB", (W, H0), WHITE)
    d = ImageDraw.Draw(im)
    ft = font(title_size, bold=True)
    block = title_size + gap + sum(ln[0] + 18 + (ln[3] if len(ln) > 3 else 0) for ln in lines)
    y = H0 / 2 - block / 2
    d.text((W / 2, y + title_size / 2), title, font=ft, fill=INK, anchor="mm")
    y += title_size + gap
    for ln in lines:
        size, txt = ln[0], ln[1]
        color = ln[2] if len(ln) > 2 else (INK if size >= 40 else GREY)
        y += ln[3] if len(ln) > 3 else 0
        d.text((W / 2, y + size / 2), txt, font=font(size), fill=color, anchor="mm")
        y += size + 18
    return np.asarray(im)


def blend_white(frame, alpha):
    """alpha 1 = frame, 0 = white."""
    if alpha >= 1:
        return frame
    return (frame.astype(np.float32) * alpha + 255 * (1 - alpha)).astype(np.uint8)


# ----------------------------------------------------------------------------- body plan (speed-up)
def narration_durations():
    p = HERE / "_tts" / "durations.json"
    return json.loads(p.read_text()) if p.exists() else {}


def kept_intervals():
    """The body minus CUTS, as [(t0, t1)]."""
    iv, cur = [], 0.0
    for a, b in sorted(CUTS):
        if a > cur:
            iv.append((cur, a))
        cur = max(cur, b)
    if cur < BODY_SECONDS:
        iv.append((cur, BODY_SECONDS))
    return iv


def body_segments():
    """[(src_t0, src_t1, speed, caption)] covering the kept body; gaps between captions play at 1x."""
    segs = []
    narr = narration_durations()
    for k0, k1 in kept_intervals():
        cur = k0
        for t0, t1, s in CAPTIONS:
            a, b = max(t0, k0), min(t1, k1)
            if b - a < 0.5:
                continue
            need = READ_BASE + len(s.split()) / READ_WPS
            if s in narr:
                need = max(need, narr[s] + NARR_PAD)
            sp = max(MIN_SPEED if s in narr else 1.0, min(MAX_SPEED, (b - a) / need))
            if a > cur:
                segs.append((cur, a, 1.0, None))
            segs.append((a, b, sp, s))
            cur = b
        if cur < k1:
            segs.append((cur, k1, 1.0, None))
    return segs


DIP = 8     # frames of white dip on each side of a cut


def body_plan():
    """One entry per OUTPUT frame of the body: (source frame index, caption, caption alpha, white-dip alpha)."""
    plan = []
    for t0, t1, sp, cap in body_segments():
        out_dur = (t1 - t0) / sp
        n = max(1, round(out_dur * FPS))
        for j in range(n):
            src_t = t0 + j * sp / FPS
            alpha = fade(j / FPS, 0.0, out_dur) if cap else 0.0
            plan.append([min(int(round(src_t * FPS)), 6446), cap, alpha, 1.0])
    for i in range(1, len(plan)):                       # a jump of more than 2 s in the source = a cut
        if plan[i][0] - plan[i - 1][0] > 2 * FPS:
            for k in range(-DIP, DIP):
                if 0 <= i + k < len(plan):
                    plan[i + k][3] = min(plan[i + k][3], (abs(k + 0.5)) / DIP)
    return [tuple(p) for p in plan]


def body_cues():
    """Output-time windows of the body captions (relative to the body start) and their speeds."""
    cues, t = [], 0.0
    for t0, t1, sp, cap in body_segments():
        d = (t1 - t0) / sp
        if cap:
            cues.append((t, t + d, cap, sp, t1 - t0))
        t += d
    return cues


# ----------------------------------------------------------------------------- segments: each yields (frame1080, band_text, band_alpha)
def seg_intro():
    bg = card(TITLE, [(48, SUBTITLE), (34, AUTHOR_LINES[0], INK, 30), (34, AUTHOR_LINES[1], INK),
                      (30, AFFIL_LINE, GREY, 16), (28, NOTE_LINE, GREY)], title_size=110)
    dur = intro_seconds()
    n = round(dur * FPS)
    for i in range(n):
        t = i / FPS
        a = min(1.0, t / 0.5, (dur - t) / 0.4)
        yield blend_white(bg, a), INTRO_CAPTION, fade(t, 0.6, dur - 0.4)


def seg_teaser():
    clip = Clip(VIDEOS / "teaser.mp4", (W, H0))
    n = round(TEASER_SECONDS * FPS)
    for i in range(n):
        t = i / FPS
        fr = next(clip)
        a = min(1.0, t / 0.4, (TEASER_SECONDS - t) / 0.5)
        cap, alpha = caption_at(TEASER_CAPTIONS, t)
        yield blend_white(fr, a), cap, alpha
    clip.close()


def pill_boxes():
    boxes = []
    for band, w, t0, t1 in PILLS:                   # the pill's drop shadow reaches ~25 px beyond its box
        x0, x1, y0, y1, cx = BANDS[band]
        half = w / 2 + 40
        boxes.append((int(t0 * FPS) - 2, int(math.ceil(t1 * FPS)) + 2,
                      y0 - 32, y1 + 32, int(cx - half), int(cx + half)))
    return boxes


def body_frame(T, N, i):
    """Text frame i with its pill caption replaced by the notext pixels."""
    T = T.copy()
    for a, b, y0, y1, x0, x1 in pill_boxes():
        if a <= i <= b:
            T[y0:y1, x0:x1] = N[y0:y1, x0:x1]
    return T


def seg_body(plan=None, start=0, stop=None):
    """Streams the body following the plan (output frames start..stop); source frames are read once, in order."""
    plan = plan or body_plan()
    stop = len(plan) if stop is None else stop
    first_src = plan[start][0]
    text = Clip(BODY_TEXT, seek=first_src / FPS if first_src else None)
    notext = Clip(BODY_NOTEXT, seek=first_src / FPS if first_src else None)
    cur = first_src                                    # index of the next frame the pipes will give
    T = N = None
    n_out = stop - start
    for k in range(start, stop):
        src, cap, alpha, wa = plan[k]
        if src > cur:                                  # sped-up scene or a cut: drop the frames in between
            text.skip(src - cur)
            notext.skip(src - cur)
            cur = src
        if T is None or src == cur:                    # src < cur = the same source frame again (slowed scene)
            T, N = next(text), next(notext)
            cur = src + 1
        fr = body_frame(T, N, src)
        left = n_out - (k - start)
        if left <= 12 and stop == len(plan):           # short fade to white into the results screens
            wa = min(wa, left / 12)
        if wa < 1:
            fr = blend_white(fr, wa)
        yield fr, cap, alpha
    text.close()
    notext.close()


def label_layer(draw_fn):
    im = Image.new("RGB", (W, H0), WHITE)
    draw_fn(ImageDraw.Draw(im))
    return np.asarray(im).copy()


def seg_sim(tasks=None):
    cw, ch, gap, pitch = 560, 420, 20, 420 + 48     # one label line under each cell: "<embodiment>  ·  <rate> %"
    top = 112
    rx = W - 80 - (2 * cw + gap)                    # robot 2x2 block, right-aligned
    hx, hy = 80, top + (2 * pitch - gap - ch) // 2 - 24
    cells = [(rx, top), (rx + cw + gap, top), (rx, top + pitch), (rx + cw + gap, top + pitch)]
    for key, title, cat, human, rates, caption in (tasks or SIM_TASKS):
        def labels(d, title=title, cat=cat, rates=rates):
            d.text((W / 2, 52), f"Simulation  ·  {title}  ({cat})", font=font(46, bold=True), fill=INK, anchor="mm")
            d.text((hx + cw / 2, hy + ch + 28), "Human video (input)", font=font(30), fill=GREY, anchor="mm")
            for (x, y), (_, name), r in zip(cells, EMBODIMENTS, rates):
                d.text((x + cw / 2, y + ch + 28), f"{name}   ·   {r:.1f} % success", font=font(30), fill=INK,
                       anchor="mm")
        bg = label_layer(labels)
        clips = [Clip(VIDEOS / f"sim/{key}_{emb}_1.mp4", (cw, ch)) for emb, _ in EMBODIMENTS]
        hclip = Clip(VIDEOS / human, (cw, ch), loop=True)
        dur = sim_seconds(caption)
        n = round(dur * FPS)
        for i in range(n):
            fr = bg.copy()
            fr[hy:hy + ch, hx:hx + cw] = next(hclip)
            for (x, y), c in zip(cells, clips):
                fr[y:y + ch, x:x + cw] = next(c)
            t = i / FPS
            a = min(1.0, t / 0.3, (dur - t) / 0.3)
            yield blend_white(fr, a), caption, fade(t, 0.0, dur)
        for c in clips + [hclip]:
            c.close()


def seg_real():
    cw, ch, gap = 600, 450, 20
    top = 150
    xs = [30, 30 + cw + gap + 20, 30 + 2 * (cw + gap + 20)]
    def labels(d):
        d.text((W / 2, 64), "Real robot  ·  UR3 + Wuji 1  ·  zero-shot, unseen configurations",
               font=font(46, bold=True), fill=INK, anchor="mm")
        for x, (title, _) in zip(xs, REAL_TASKS):
            d.text((x + cw / 2, top - 26), title, font=font(30), fill=INK, anchor="mm")
    bg = label_layer(labels)
    clips = [[Clip(VIDEOS / p, (cw, ch)) for p in paths] for _, paths in REAL_TASKS]
    dur = real_seconds()
    n = round(dur * FPS)
    for i in range(n):
        fr = bg.copy()
        for x, col in zip(xs, clips):
            for r, c in enumerate(col):
                y = top + r * (ch + gap)
                fr[y:y + ch, x:x + cw] = next(c)
        t = i / FPS
        a = min(1.0, t / 0.3, (dur - t) / 0.3)
        yield blend_white(fr, a), REAL_CAPTION, fade(t, 0.0, dur)
    for col in clips:
        for c in col:
            c.close()


def seg_end():
    bg = card(TITLE, [(44, "Extract what must be achieved from the video — and let RL discover how."),
                      (36, "dex-one2many.github.io")], title_size=110)
    n = round(END_SECONDS * FPS)
    for i in range(n):
        t = i / FPS
        a = min(1.0, t / 0.5, (END_SECONDS - t) / 0.6)
        yield blend_white(bg, a), None, 0.0


def timeline(plan):
    yield from seg_intro()
    yield from seg_teaser()
    yield from seg_body(plan)
    yield from seg_sim()
    yield from seg_real()
    yield from seg_end()


def compose(frame, cap, alpha):
    canvas = np.full((H, W, 3), 255, np.uint8)
    canvas[:H0] = frame
    if cap:
        put_band(canvas, cap, alpha)
    return canvas


# ----------------------------------------------------------------------------- cue sheet / vtt
def ts(x, sep="."):
    h, r = divmod(x, 3600)
    m, s = divmod(r, 60)
    return f"{int(h):02d}:{int(m):02d}:{s:06.3f}".replace(".", sep)


def write_cues(path_vtt, path_md, body_out):
    cues = [(0.6, intro_seconds() - 0.4, INTRO_CAPTION, 1.0, intro_seconds())]
    off = intro_seconds()
    cues += [(t0 + off, t1 + off, s, 1.0, t1 - t0) for t0, t1, s in TEASER_CAPTIONS]
    off += TEASER_SECONDS
    cues += [(a + off, b + off, s, sp, src) for a, b, s, sp, src in body_cues()]
    t = off + body_out
    for *_, caption in SIM_TASKS:
        d = sim_seconds(caption)
        cues.append((t, t + d, caption, 1.0, d))
        t += d
    cues.append((t, t + real_seconds(), REAL_CAPTION, 1.0, real_seconds()))

    with open(path_vtt, "w") as f:
        f.write("WEBVTT\n\n")
        for i, (a, b, s, *_) in enumerate(cues, 1):
            f.write(f"{i}\n{ts(a)} --> {ts(b)}\n{s}\n\n")
    with open(path_md, "w") as f:
        f.write("# overview.mp4 · caption cue sheet\n\nTimes are in the final video (intro card "
                f"{intro_seconds():.1f} s, teaser {TEASER_SECONDS:.1f} s, body {body_out:.1f} s, then the results). "
                f"A body scene plays at `speed` x when its caption needs less time than the source window "
                f"(need = {READ_BASE} s + words / {READ_WPS}; max {MAX_SPEED}x). "
                "`TTS s` = words / 2.5, the narration time if one is added.\n\n"
                "| # | start | end | shown s | speed | source s | words | TTS s | caption |\n"
                "|---|---|---|---|---|---|---|---|---|\n")
        for i, (a, b, s, sp, src) in enumerate(cues, 1):
            n = len(s.split())
            f.write(f"| {i} | {ts(a)[3:]} | {ts(b)[3:]} | {b - a:.1f} | {sp:.2f} | {src:.1f} | {n} | {n / 2.5:.1f} "
                    f"| {s} |\n")


# ----------------------------------------------------------------------------- main
def main():
    global BODY_TEXT, BODY_NOTEXT, BODY_SECONDS, VIDEOS, FONTS_DIR
    ap = argparse.ArgumentParser()
    ap.add_argument("mode", choices=["probe", "build", "cues"])
    ap.add_argument("times", nargs="*", type=float, help="probe: output-timeline seconds")
    ap.add_argument("--bundle", default=str(PAGE.parent), help="pikachu_video_bundle root")
    ap.add_argument("--out", default=str(PAGE / "static/videos/overview.mp4"))
    ap.add_argument("--fast", action="store_true", help="x264 preset medium instead of slow")
    ap.add_argument("--crf", type=int, default=19)
    args = ap.parse_args()

    bundle = Path(args.bundle)
    long_dir = bundle / "outputs/project_video/pikachu_in_pot/part3/v4/FULLP_v5a_long"
    BODY_TEXT, BODY_NOTEXT = long_dir / "FULLP_v5a_long_text.mp4", long_dir / "FULLP_v5a_long_notext.mp4"
    BODY_SECONDS = 6447 / FPS
    VIDEOS = PAGE / "static/videos"
    FONTS_DIR = bundle / "scripts/project_video/assets/fonts"
    for p in (BODY_TEXT, BODY_NOTEXT, FONTS_DIR / "NimbusSans-Regular.otf"):
        assert p.exists(), p

    plan = body_plan()
    body_out = len(plan) / FPS
    total = (intro_seconds() + TEASER_SECONDS + body_out + sum(sim_seconds(c) for *_, c in SIM_TASKS)
             + real_seconds() + END_SECONDS)
    vtt, md = HERE / "overview_captions.vtt", HERE / "overview_captions.md"
    write_cues(vtt, md, body_out)
    sped = [(s, sp, src) for _, _, s, sp, src in body_cues() if abs(sp - 1.0) > 0.005]
    print(f"body {BODY_SECONDS:.1f} s -> {body_out:.1f} s ({len(sped)} of {len(CAPTIONS)} captions re-timed); "
          f"total {total:.1f} s = {ts(total)[3:8]}")
    if args.mode == "cues":
        for s, sp, src in sped:
            print(f"  {sp:.2f}x  {src:5.1f} s -> {src / sp:4.1f} s  {s}")
        print(vtt, md)
        return

    if args.mode == "probe":
        out = HERE / "_probe"
        out.mkdir(exist_ok=True)
        b0 = intro_seconds() + TEASER_SECONDS
        bounds = [("intro", 0, intro_seconds()), ("teaser", intro_seconds(), b0), ("body", b0, b0 + body_out)]
        t = b0 + body_out
        for key, *_, caption in SIM_TASKS:
            bounds.append((f"sim_{key}", t, t + sim_seconds(caption)))
            t += sim_seconds(caption)
        bounds += [("real", t, t + real_seconds()), ("end", t + real_seconds(), t + real_seconds() + END_SECONDS)]
        for tt in args.times:
            name = next((k for k, a, b in bounds if a <= tt < b), None)
            assert name, f"{tt} s is past the end ({total:.1f} s)"
            a = next(a for k, a, b in bounds if k == name)
            k = round((tt - a) * FPS)
            if name == "body":
                gen = seg_body(plan, start=k, stop=k + 1)
            else:                                   # cards / outro: run the segment up to that frame
                if name.startswith("sim_"):
                    gen = seg_sim([x for x in SIM_TASKS if x[0] == name[4:]])
                else:
                    gen = {"intro": seg_intro, "teaser": seg_teaser, "real": seg_real, "end": seg_end}[name]()
                for _ in range(k):
                    next(gen)
            fr, cap, al = next(gen)
            Image.fromarray(compose(fr, cap, al)).save(out / f"t{tt:07.2f}_{name}.png")
            print(out / f"t{tt:07.2f}_{name}.png", "|", cap)
        return

    # build
    n_total = round(total * FPS)
    cmd = ["ffmpeg", "-y", "-v", "error", "-stats", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}",
           "-r", str(FPS), "-i", "-", "-c:v", "libx264", "-preset", "medium" if args.fast else "slow",
           "-crf", str(args.crf), "-pix_fmt", "yuv420p", "-movflags", "+faststart", args.out]
    enc = subprocess.Popen(cmd, stdin=subprocess.PIPE)
    n = 0
    for fr, cap, al in timeline(plan):
        enc.stdin.write(compose(fr, cap, al).tobytes())
        n += 1
        if n % 600 == 0:
            print(f"\r{n}/{n_total} frames ({n / FPS:.0f} s)", end="", file=sys.stderr, flush=True)
    enc.stdin.close()
    enc.wait()
    print(f"\n{args.out}: {n} frames = {n / FPS:.2f} s, {os.path.getsize(args.out) / 1e6:.1f} MB")
    print(vtt, md)


if __name__ == "__main__":
    main()
