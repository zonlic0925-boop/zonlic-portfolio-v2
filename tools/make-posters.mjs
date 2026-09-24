// Poster frames for the Dragon Balloon demonstrations. Each poster is a real frame lifted from the
// owner's own screen recording, so the plate shows what the clip actually contains before it loads.
// Provenance is written into the JPEG comment by the same run.
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const DIR = fileURLToPath(new URL('../assets/projects/dragon-balloon/', import.meta.url))
const WIDTH = 720

const clips = fs
  .readdirSync(DIR)
  .filter((f) => f.endsWith('.mp4'))
  .sort()

// A frame from the first seconds of a screen recording is often an empty canvas,
// and ffprobe is not guaranteed on PATH, so read the duration off ffmpeg's own
// banner and take a frame from 55% in, where the clip is showing the work.
function frameAt(file) {
  let banner = ''
  try {
    execFileSync('ffmpeg', ['-hide_banner', '-i', file], { stdio: ['ignore', 'ignore', 'pipe'] })
  } catch (error) {
    banner = String(error.stderr || '')
  }
  const match = /Duration:\s*(\d+):(\d+):(\d+\.\d+)/.exec(banner)
  if (!match) return '1.5'
  const seconds = Number(match[1]) * 3600 + Number(match[2]) * 60 + Number(match[3])
  return seconds > 2 ? (seconds * 0.55).toFixed(2) : '1.5'
}

for (const clip of clips) {
  const source = path.join(DIR, clip)
  const out = path.join(DIR, clip.replace(/\.mp4$/, '.jpg'))
  const at = frameAt(source)
  execFileSync('ffmpeg', [
    '-hide_banner',
    '-loglevel', 'error',
    '-y',
    '-ss', at,
    '-i', source,
    '-frames:v', '1',
    '-vf', `scale=${WIDTH}:-2:flags=lanczos`,
    '-q:v', '4',
    '-metadata', `comment=Frame at ${at}s extracted from ${clip} with ffmpeg; source clip is the owner's own screen recording of Dragon Balloon.`,
    out,
  ])
  const kb = Math.round(fs.statSync(out).size / 1024)
  console.log(`${clip} @${at}s -> ${path.basename(out)} (${kb} KB)`)
}
