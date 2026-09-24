# Derive the portfolio's portrait from the owner's own stylised render.
#
# The source (assets/img/portrait-render-src.png) is a 1536x1024 stylised figure
# with two faults for a paper-white sheet: a transparency checkerboard baked into
# the background pixels, and a purple-to-orange glow that fights the sheet's single
# blue accent.
#
# Matting the figure out was tried and abandoned. The figure's hair and suit are
# dark, the background is dark, and every reconstruction of the background matched
# the figure's own dark parts closely enough to keep a band of background attached
# behind the head; a hand-authored correction would have been guesswork on a
# photograph. Instead the render keeps its own backdrop and the backdrop is cleaned:
# the checkerboard is median-filtered away and the glow is desaturated toward a
# neutral, so the plate reads as a framed photographic insert on the sheet.
#
# Run with the agent-reach venv (opencv + PIL):
#   /c/Users/Zonlic/.agent-reach-venv/Scripts/python.exe tools/make-portrait.py
import sys

import cv2
import numpy as np
from PIL import Image

SRC = 'assets/img/portrait-render-src.png'
OUT = 'assets/img/portrait.png'

# Head-and-shoulders crop, kept at the 0.8 aspect the layout was built around.
CROP = (360, 0, 1180, 1024)

# Saturation ramp: pixels at or above LUM_HI keep their colour, pixels at or below
# LUM_LO lose most of it. The glow and the backdrop sit in the low band; the face,
# shirt and tie sit in the high band.
LUM_LO, LUM_HI = 62.0, 132.0
SAT_FLOOR = 0.22


def main():
    image = cv2.imread(SRC, cv2.IMREAD_COLOR)
    if image is None:
        sys.exit(f'cannot read {SRC}')

    x0, y0, x1, y1 = CROP
    crop = image[y0:y1, x0:x1].copy()

    # Median filter: the checkerboard is a small, low-amplitude texture, so a
    # median pass removes it while leaving a smooth 3D render intact.
    cleaned = cv2.medianBlur(crop, 7)

    # Desaturate the dark backdrop without draining the figure's colour.
    hsv = cv2.cvtColor(cleaned, cv2.COLOR_BGR2HSV).astype(np.float32)
    luminance = hsv[:, :, 2]
    ramp = np.clip((luminance - LUM_LO) / (LUM_HI - LUM_LO), 0.0, 1.0)
    scale = SAT_FLOOR + (1.0 - SAT_FLOOR) * ramp
    hsv[:, :, 1] = np.clip(hsv[:, :, 1] * scale, 0, 255)

    # Lift the darkest backdrop a little so the plate is a dark field rather than a
    # hole punched in the sheet.
    hsv[:, :, 2] = np.clip(luminance * 0.88 + 14.0, 0, 255)

    graded = cv2.cvtColor(hsv.astype(np.uint8), cv2.COLOR_HSV2BGR)
    Image.fromarray(cv2.cvtColor(graded, cv2.COLOR_BGR2RGB)).save(OUT, quality=92)

    print(f'{OUT}: {x1 - x0}x{y1 - y0} from {SRC}')


if __name__ == '__main__':
    main()
