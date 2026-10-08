#!/usr/bin/env python3
"""
Rollout clips for the interactive grasp-taxonomy board: clicking a cell plays that cell's rollout in the card.

Input   <mosaic15>/<task>/<emb>/cells/X?Y?.mp4
        These are from Real2Scene2Real outputs/project_video/mosaic15. Each is one real, successful eval episode per
        board cell, with the hand tinted in its taxonomy colour. They are the same episodes and taxonomy as
        exp_figures_new.
Output  static/videos/taxonomy/<task key>/<emb key>/X?Y?.mp4
        720x540 H.264, CRF 26, no audio, faststart. The 1280x720 source is cropped to its 960x720 centre
        (x 140-1100), which keeps the robot, the table and every goal.

Run     python3 tools/build_rollouts.py /path/to/mosaic15        (needs ffmpeg on PATH)
"""
import subprocess, sys
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "static" / "videos" / "taxonomy"
TASKS = {"pikachu_in_pot": "doll", "coke_in_bucket": "can", "stamp": "stamp", "hammering": "hammer", "sweep_toy": "sweep"}
EMBS = {"ur3_wuji_left": "ur3_wuji1", "ur5e_sharpa": "ur5e_sharpa", "ur5e_wuji2": "ur5e_wuji2", "ur5e_allegro": "ur5e_allegro"}
VF = "crop=960:720:140:0,scale=720:540"


def encode(job):
    src, dst = job
    dst.parent.mkdir(parents=True, exist_ok=True)
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(src), "-vf", VF, "-c:v", "libx264", "-crf", "26",
                    "-preset", "slow", "-pix_fmt", "yuv420p", "-color_range", "tv", "-colorspace", "smpte170m",
                    "-color_primaries", "bt709", "-color_trc", "bt709", "-movflags", "+faststart", "-an", str(dst)],
                   check=True)


def main():
    src_root = Path(sys.argv[1])
    jobs = [(src_root / t / e / "cells" / f"X{x}Y{y}.mp4", OUT / tk / ek / f"X{x}Y{y}.mp4")
            for t, tk in TASKS.items() for e, ek in EMBS.items() for x in range(1, 4) for y in range(1, 6)]
    missing = [str(s) for s, _ in jobs if not s.exists()]
    if missing:
        sys.exit(f"missing {len(missing)} clips, e.g. {missing[0]}")
    with ThreadPoolExecutor(16) as ex:
        list(ex.map(encode, jobs))
    print(f"{len(jobs)} clips -> {OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
