# Sheet 01 - inspection drawing

A static personal portfolio for ZHANG Zilong (Zonlic). It is one sheet of a ballooned
inspection drawing: the person is the part, every credential and project is a ballooned
characteristic, and each claim carries an index that points at the record it came from.

No build step. No dependencies. Push and it is live.

## Run it locally

```bash
python -m http.server 8777
# http://127.0.0.1:8777/index.html
```

Any static server works. Opening `index.html` from the filesystem works too, except that the
fonts and images are referenced by relative path, so a server is the honest test.

## Layout

```
index.html                  the shell: meta, JSON-LD, fixed sheet chrome, empty zone sections
assets/css/sheet.css        the whole design system
assets/css/fonts.css        generated @font-face sheet (self-hosted subsets)
assets/js/content.js        every visitor-facing string, English and Traditional Chinese
assets/js/app.js            the renderer and all interaction
assets/js/icons.js          Phosphor icon paths (MIT), vendored because there is no build
assets/fonts/               Barlow + Azeret Mono, latin and latin-ext WOFF2
assets/img/                 portrait render, its source, and the favicon
assets/projects/            real screenshots, demo clips, poster frames, campus and press images
tools/fetch-fonts.mjs       re-pull the font subsets
tools/make-posters.mjs      re-extract the demo poster frames with ffmpeg
tools/make-portrait.py      re-crop and grade the portrait render (opencv + PIL)
PRODUCT.md                  product truth: users, purpose, constraints, evidence on hand
DESIGN.md                   the built visual system
```

## Editing content

All copy lives in `assets/js/content.js` as `content.en` and `content.zh`. The two languages are
independent objects, not a key-by-key translation, so a change to one does not force a change to
the other. Numbers on the page should trace to the CV, to a shipped product, or to a screenshot
that ships in `assets/projects/`; if a figure cannot be pointed at, it does not belong on the
sheet.

The bilingual toggle, the light/night toggle, the zone rail, the balloon cross-references and the
figure lightbox all run from `assets/js/app.js`. There is no framework and no state library.

## Deploying

GitHub Pages serves this repository from the `main` branch root. Nothing needs to be built, so
there is no workflow file: pushing to `main` is the deploy.

## Tools that need ffmpeg

`tools/make-posters.mjs` extracts one frame from each Dragon Balloon clip to use as its poster. It
runs `ffmpeg` and `ffprobe` from PATH. Run it only when the demo clips change; the poster frames it
produces are committed, and each carries its provenance in the JPEG comment.

## Notes on assets

Every raster in `assets/` carries its origin embedded as an `impeccable:prompt` PNG text chunk or a
JPEG comment. Read one with:

```bash
node <impeccable>/scripts/embed-prompt.mjs assets/img/portrait.png --read
```

The ZonKey screenshots, the campus and press photographs and the QR code are the owner's own
material, carried over from the previous portfolio repository. The Dragon Balloon poster frames are
extracted from the owner's own screen recordings. The portrait is the owner's own stylised render,
cropped and graded by `tools/make-portrait.py`; its untouched source sits beside it as
`portrait-render-src.png`. Nothing on this sheet is stock imagery and nothing is generated here.
