#!/usr/bin/env python3
"""
exp_figures/ 의 grasp taxonomy 자료를 웹용으로 변환한다.

입력  exp_figures/<task>/{panels,grid,representatives.json}
출력  static/images/taxonomy/<task>/<emb>.webp            (글자 없는 패널)
      static/images/taxonomy/<task>/<emb>/X?Y?.webp       (칸별 grasp 이미지, 480x400)
      static/js/taxonomy-data.js                          (격자 좌표 · 칸 매핑 · 타일 라벨)

실행: python3 tools/build_taxonomy.py      (레포 루트에서, Pillow 필요)
"""
import json, os, sys, shutil
from pathlib import Path
from PIL import Image, ImageChops, ImageStat

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "exp_figures_new"   # 5 task 전체 자료 (exp_figures 의 상위 집합)
OUT_IMG = ROOT / "static" / "images" / "taxonomy"
OUT_JS = ROOT / "static" / "js" / "taxonomy-data.js"

TASKS = [  # (폴더, 키, 라벨) — 페이지 표시 순서
    ("pikachu_in_pot", "doll", "Doll"),
    ("coke_in_bucket", "can", "Can"),
    ("stamp", "stamp", "Stamp"),
    ("hammering", "hammer", "Hammer"),
    ("sweep_toy", "sweep", "Sweep"),
]
EMBS = [  # (자료 키, 페이지 키, 라벨) — 페이지 표시 순서
    ("ur3_wuji_left", "ur3_wuji1", "UR3 + Wuji 1"),
    ("ur5e_sharpa", "ur5e_sharpa", "UR5e + Sharpa"),
    ("ur5e_wuji2", "ur5e_wuji2", "UR5e + Wuji 2"),
    ("ur5e_allegro", "ur5e_allegro", "UR5e + Allegro"),
]
ROWS, COLS = 3, 5
CELL_SIZE = (480, 400)
PANEL_Q, CELL_Q = 85, 82


def find_offset(fig, panel, quadrant):
    """패널 이미지가 전체 그림 안 어디에 있는지 (x, y) 픽셀 offset. 1:1 크롭 가정."""
    FW, FH = fig.size
    PW, PH = panel.size
    qx, qy = quadrant
    ex, ey = qx * (FW - PW), qy * (FH - PH)
    px, py = PW // 2 - 80, PH // 2 - 80
    patch = panel.crop((px, py, px + 160, py + 160))
    best = None
    for step, rng in ((4, 80), (1, 6)):
        cx, cy = (ex, ey) if best is None else best[1:]
        for dx in range(-rng, rng + 1, step):
            for dy in range(-rng, rng + 1, step):
                ox, oy = cx + dx + px, cy + dy + py
                if ox < 0 or oy < 0 or ox + 160 > FW or oy + 160 > FH:
                    continue
                d = sum(ImageStat.Stat(ImageChops.difference(fig.crop((ox, oy, ox + 160, oy + 160)), patch)).mean)
                if best is None or d < best[0]:
                    best = (d, cx + dx, cy + dy)
    return best[1], best[2], best[0]


# 타일 후보 위치 (패널 크기 비율). 자료의 패널 배치 규칙: 좌/우 가장자리 열에 위·아래 타일, 폭 278/1036, 높이 232/640
TILE_SLOTS = [
    (0.0, 62 / 640, 278 / 1036, 294 / 640),          # 좌상
    (0.0, 358 / 640, 278 / 1036, 590 / 640),         # 좌하
    (0.0, 208 / 640, 278 / 1036, 440 / 640),         # 좌중 (타일이 2개뿐일 때)
    (756 / 1036, 62 / 640, 1.0, 294 / 640),          # 우상
    (756 / 1036, 358 / 640, 1.0, 590 / 640),         # 우하
    (756 / 1036, 208 / 640, 1.0, 440 / 640),         # 우중
]


def find_in(big, small):
    """small 이미지(장면만 잘라 렌더한 clean 패널)가 big(notext 패널) 안 어디에 있는지 (x, y, err).
    small 중앙 160×160 패치를 big 전체에서 coarse→fine 으로 찾는다."""
    BW, BH = big.size
    SW, SH = small.size
    px, py = SW // 2 - 80, SH // 2 - 80
    patch = small.crop((px, py, px + 160, py + 160))
    best = None
    for step, rng, center in ((8, None, None), (1, 10, None)):
        if rng is None:
            xs = range(0, BW - SW + 1, step); ys = range(0, BH - SH + 1, step)
        else:
            cx, cy = best[1], best[2]
            xs = range(max(0, cx - rng), min(BW - SW, cx + rng) + 1, step)
            ys = range(max(0, cy - rng), min(BH - SH, cy + rng) + 1, step)
        for ox in xs:
            for oy in ys:
                d = sum(ImageStat.Stat(ImageChops.difference(big.crop((ox + px, oy + py, ox + px + 160, oy + py + 160)), patch)).mean)
                if best is None or d < best[0]:
                    best = (d, ox, oy)
    return best[1], best[2], best[0]


def detect_tiles(panel):
    """글자 없는 패널에서 회색 타일이 실제로 있는 슬롯만 골라 바운딩 박스를 돌려준다.
    타일 테두리 안쪽 띠(손·빔이 거의 닿지 않는 영역)가 저채도 회색이면 타일로 본다."""
    W, H = panel.size
    px = panel.load()

    def is_gray(x, y):
        r, g, b = px[x, y][:3]
        return (max(r, g, b) - min(r, g, b) <= 14) and 150 <= (r + g + b) / 3 <= 235

    def slot_has_tile(slot):
        fx0, fy0, fx1, fy1 = slot
        x0, y0, x1, y1 = int(fx0 * W), int(fy0 * H), int(fx1 * W), int(fy1 * H)
        # 둥근 모서리를 피해 안쪽으로 10px 들어간 테두리 띠를 샘플
        pts = []
        for x in range(x0 + 14, x1 - 14, 3):
            pts.append((x, y0 + 10)); pts.append((x, y1 - 11))
        for y in range(y0 + 14, y1 - 14, 3):
            pts.append((x0 + 10, y)); pts.append((x1 - 11, y))
        frac = sum(1 for (x, y) in pts if is_gray(x, y)) / len(pts)
        return (x0, y0, x1, y1) if frac > 0.6 else None

    boxes = []
    # 좌/우 각각: 위·아래 슬롯을 먼저 보고, 둘 다 없을 때만 가운데 슬롯(타일 2개 배치)을 본다
    for side in (TILE_SLOTS[0:3], TILE_SLOTS[3:6]):
        top, bottom, middle = side
        found = [b for b in (slot_has_tile(top), slot_has_tile(bottom)) if b]
        if not found:
            m = slot_has_tile(middle)
            if m:
                found = [m]
        boxes.extend(found)
    return boxes


def match_tile(panel, box, candidates):
    """타일 영역과 가장 닮은 칸 이미지를 고른다. candidates: [(cellkey, PIL image)]"""
    x0, y0, x1, y1 = box
    tile = panel.crop((x0, y0, x1, y1)).convert("RGB")
    best = None
    for key, im in candidates:
        cand = im.convert("RGB").resize(tile.size, Image.LANCZOS)
        d = sum(ImageStat.Stat(ImageChops.difference(tile, cand)).mean)
        if best is None or d < best[0]:
            best = (d, key)
    return best


def main():
    if not SRC.exists():
        sys.exit(f"source folder not found: {SRC}")
    if OUT_IMG.exists():
        shutil.rmtree(OUT_IMG)
    OUT_IMG.mkdir(parents=True)

    data = {"cellFill": 0, "tasks": []}
    for folder, tkey, tlabel in TASKS:
        tdir = SRC / folder
        cells_json = json.load(open(tdir / "grid" / "cells.json"))
        reps = json.load(open(tdir / "representatives.json"))
        fig = Image.open(tdir / "fig_embodiments.png").convert("RGB")
        task_out = {"key": tkey, "label": tlabel, "panels": []}
        print(f"== {tlabel} ({folder})")

        # 전체 그림에서의 패널 위치(사분면): 자료 배치 순서 sharpa, wuji2 / allegro, ur3
        quadrants = {"ur5e_sharpa": (0, 0), "ur5e_wuji2": (1, 0), "ur5e_allegro": (0, 1), "ur3_wuji_left": (1, 1)}

        for ekey_src, ekey, elabel in EMBS:
            panel_txt = Image.open(tdir / "panels" / f"{ekey_src}.png").convert("RGB")
            panel = Image.open(tdir / "panels" / f"{ekey_src}_notext.png").convert("RGB")
            PW, PH = panel.size
            ox, oy, err = find_offset(fig, panel_txt, quadrants[ekey_src])

            # 베이스: 타일·빔 없는 clean 렌더가 있으면 그것을, 없으면 notext 패널을 쓴다
            clean_path = tdir / "panels" / f"{ekey_src}_clean.png"
            base = panel
            cx = cy = 0           # clean 이미지의 notext 패널 안 위치
            use_tiles = True
            if clean_path.exists():
                base = Image.open(clean_path).convert("RGB")
                use_tiles = False
                if base.size != panel.size:
                    cx, cy, cerr = find_in(panel, base)
                    if cerr > 20:
                        sys.exit(f"  {ekey}: clean 렌더가 notext 패널과 맞지 않습니다 (match_err={cerr:.1f}). 같은 카메라로 렌더했는지 확인하세요.")
            BW, BH = base.size
            print(f"  {ekey:13s} offset=({ox},{oy}) match_err={err:.1f} base={'clean' if not use_tiles else 'notext'}"
                  + (f" clean_at=({cx},{cy})" if (cx or cy) else ""))

            (OUT_IMG / tkey / ekey).mkdir(parents=True, exist_ok=True)
            base.save(OUT_IMG / tkey / f"{ekey}.webp", "WEBP", quality=PANEL_Q, method=6)

            cells_src = cells_json["cells"][ekey_src]
            rep_cells = set(reps.get(ekey_src, {}).values())

            def pct(pt):
                # 전체 그림 px → notext 패널 px → (clean 이면) clean 이미지 px → %
                return [round((pt[0] - ox - cx) / BW * 100, 2), round((pt[1] - oy - cy) / BH * 100, 2)]

            corners = [
                pct(cells_src["X1Y1"]["quad_px"][0]),
                pct(cells_src[f"X1Y{COLS}"]["quad_px"][1]),
                pct(cells_src[f"X{ROWS}Y{COLS}"]["quad_px"][2]),
                pct(cells_src[f"X{ROWS}Y1"]["quad_px"][3]),
            ]

            cells_out, zoomed = {}, []
            for r in range(ROWS):
                for c in range(COLS):
                    k = f"X{r+1}Y{c+1}"
                    cs = cells_src.get(k)
                    if not cs:
                        continue
                    im = Image.open(tdir / "grid" / cs["image"]).convert("RGB")
                    rel = f"static/images/taxonomy/{tkey}/{ekey}/{k}.webp"
                    im.resize(CELL_SIZE, Image.LANCZOS).save(ROOT / rel, "WEBP", quality=CELL_Q, method=6)
                    cells_out[f"{r},{c}"] = {
                        "name": cs["name"], "taxonomy": cs["taxonomy"], "img": rel,
                        "rep": k in rep_cells, "zoomed": bool(cs.get("zoomed_in_figure")),
                    }
                    if cs.get("zoomed_in_figure"):
                        zoomed.append((k, im, cs["name"]))

            # 대표 타일 라벨 (notext 베이스일 때만; clean 베이스에는 타일이 없음)
            tiles = []
            boxes = detect_tiles(panel) if use_tiles else []
            for box in boxes:
                m = match_tile(panel, box, [(k, im) for k, im, _ in zoomed])
                if m is None:
                    continue
                name = next(n for k, _, n in zoomed if k == m[1])
                x0, y0, x1, y1 = box
                tiles.append({"label": name, "cell": m[1],
                              "at": [round((x0 + x1) / 2 / PW * 100, 2), round((y1 + 6) / PH * 100, 2)]})
            if use_tiles:
                names = ", ".join(t["label"] for t in tiles) or "(none)"
                print(f"                tiles={len(boxes)} -> {names}")
                if len(boxes) != len(zoomed):
                    print(f"                ! zoomed cells={len(zoomed)} but tiles detected={len(boxes)}")

            task_out["panels"].append({
                "key": ekey, "label": elabel,
                "base": f"static/images/taxonomy/{tkey}/{ekey}.webp",
                "corners": corners, "rows": ROWS, "cols": COLS,
                "tiles": tiles, "cells": cells_out,
            })
        data["tasks"].append(task_out)

    header = (
        "/* 자동 생성: tools/build_taxonomy.py — 직접 수정하지 말고 exp_figures 를 갱신한 뒤 스크립트를 다시 실행하세요.\n"
        "   구조: tasks[] → panels[] → corners(바둑판 네 꼭짓점, 이미지 % 좌표), cells{\"행,열\": {name, img, ...}}, tiles[](대표 타일 라벨 위치)\n"
        "   ?taxodebug 로 격자 확인, ?task=<key>&taxo=<embodiment key> 로 초기 선택 */\n"
    )
    OUT_JS.write_text(header + "window.TAXONOMY_DATA = " + json.dumps(data, ensure_ascii=False, indent=1) + ";\n")
    total = sum(p.stat().st_size for p in OUT_IMG.rglob("*.webp"))
    print(f"\nwrote {OUT_JS.relative_to(ROOT)} and {total/1e6:.1f} MB of images under {OUT_IMG.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
