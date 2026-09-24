# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static HTML + hand-authored CSS + one ES module, no build step. Chosen because a portfolio is
content that changes rarely and must load instantly for a recruiter on any device; a bundler adds
deployment risk and a JS runtime dependency without adding capability here. Fonts are self-hosted
WOFF2 subsets in `assets/fonts/`.

## Users

Primary: recruiters, hiring managers and technical interviewers in Hong Kong and the Pearl River
Delta, scanning on a laptop between other candidates. Secondary: open-source users arriving from
the ZonKey repository or release notes, who want to know who built it and whether it is maintained.

## Product Purpose

A one-person portfolio site for ZHANG Zilong (Zonlic). It exists to make a single claim credible in
under a minute: one person carries a technical thread from laboratory research through regulatory
certification to a shipped, installable product. Success is a recruiter believing the evidence and
making contact.

## Positioning

The claim is only truthful if the evidence is specific: an SCI paper, a certificate body's standard
numbers, a manufacturing QA team's measured cycle-time drop, a released installer. Most portfolios
assert capability; this one has to produce the artifacts.

## Operating Context

The person's real document trail is the material for the site: engineering drawings with
confidentiality marks (the artifact ZonKey redacts and Dragon Balloon balloons), FDA / UL / CSA /
FCC certification records, HPLC / GC-MS instrument data, SCI manuscript contributions, and the
released ZonKey build. Visitors arrive from a CV, a LinkedIn profile, or GitHub, and compare what
they read here against a one-page CV.

## Capabilities and Constraints

- Bilingual English / Traditional Chinese (zh-HK) with a single toggle; both languages are
  first-class, not a translation afterthought.
- The site is static and must stay deployable to GitHub Pages from a branch, with no CI step.
- No fabricated metrics, logos, employers, testimonials, or benchmarks. Every number on the page
  must trace to the CV, the existing site, or a product screenshot the visitor can also see.
- Content must remain maintainable by the owner alone: one data module holds both languages.

## Brand Commitments

- Name: ZHANG Zilong, alias Zonlic. Both appear on the CV and on GitHub; the alias is the public
  handle, the full name is the record.
- Real contact channels only: `zonlic0925@gmail.com`, `(852) 8495-7302`,
  `linkedin.com/in/zonlic6`, `github.com/zonlic0925-boop`.
- ZonKey and Dragon Balloon are the product names (BubbleMate is retired).

## Evidence on Hand

- Portrait photograph: `assets/img/portrait.png` (819x1024).
- ZonKey product screenshots, six, 1280x720: home / drawing redaction / Word PII / PDF workshop /
  rules centre / audit trail (`assets/projects/zonkey/`).
- Dragon Balloon feature demonstrations, seven MP4 clips (`assets/projects/dragon-balloon/`).
- CityU campus and press attachments: appreciation letter, gelato team, Wen Wei Po and Ming Pao
  clippings (`assets/projects/cityu-campus/`, `assets/projects/cityu-gelato/`).
- ZonKey web-edition QR code (`assets/projects/zonkey/qr-zonkey-web.png`).
- Absent, and must not be invented: employer logos, third-party testimonials, certification
  certificate scans, publication DOIs, salary or availability claims.

## Product Principles

1. Evidence over adjectives. A number that cannot be traced to a screenshot or a document does not
   ship.
2. One person, one thread. Research, certification and product work are stages of the same method,
   so the site presents them as one record rather than separate job listings.
3. Both languages carry equal weight; neither reads as the translation.
4. The site must survive the owner editing it alone at 1am, which means plain files and no toolchain.
5. Credibility for a technical reader comes from precision, not volume.

## Accessibility & Inclusion

Keyboard reachable throughout; the language and theme controls are real controls, not decorative.
Motion collapses to static under `prefers-reduced-motion`. Text contrast meets WCAG AA in both
light and dark modes.
