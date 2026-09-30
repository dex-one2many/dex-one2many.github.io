# Dex-One2Many project page

Static project page (no build step). Served by GitHub Pages from the `main` branch root.

## Local preview

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Where things go

| What | Path |
|---|---|
| Page markup | `index.html` (search for `TODO` to find every placeholder) |
| Styles / theme tokens | `static/css/index.css` (`:root` block at the top; `--accent` is the highlight color) |
| Behavior (nav, reveal, copy) | `static/js/index.js` |
| Full-screen teaser video | `static/videos/teaser.mp4` (H.264 MP4, ~1920×1080, keep under ~15 MB) |
| Other videos / figures | `static/videos/`, `static/images/` |

## Deploy

GitHub repo → Settings → Pages → Source: **Deploy from a branch**, branch `main`, folder `/ (root)`.
`.nojekyll` is present so Pages serves the files as-is.
