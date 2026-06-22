import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const API_KEY    = 'nLaC3gRkpxpVJhLrSheoAxoZ'
const INPUT_DIR  = path.join(__dirname, '../public/frames/gme')
const OUTPUT_DIR = path.join(__dirname, '../public/frames/gme-nobg')
const TOTAL      = 192

async function removeBg(inputPath, outputPath) {
  const imageData = fs.readFileSync(inputPath)
  const form      = new FormData()
  form.append('image_file', new Blob([imageData], { type: 'image/png' }), path.basename(inputPath))
  form.append('size', 'auto')

  const res = await fetch('https://api.remove.bg/v1.0/removebg', {
    method:  'POST',
    headers: { 'X-Api-Key': API_KEY },
    body:    form,
  })

  if (!res.ok) {
    const msg = await res.text()
    throw new Error(`HTTP ${res.status}: ${msg}`)
  }

  const buf = await res.arrayBuffer()
  fs.writeFileSync(outputPath, Buffer.from(buf))
}

async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true })

  let done = 0, failed = 0

  for (let i = 1; i <= TOTAL; i++) {
    const num  = String(i).padStart(3, '0')
    const src  = path.join(INPUT_DIR,  `ezgif-frame-${num}.png`)
    const dest = path.join(OUTPUT_DIR, `ezgif-frame-${num}.png`)

    if (fs.existsSync(dest)) {
      process.stdout.write(`\r[${i}/${TOTAL}] skipped (exists)   `)
      done++
      continue
    }

    try {
      process.stdout.write(`\r[${i}/${TOTAL}] processing...      `)
      await removeBg(src, dest)
      done++
      process.stdout.write(`\r[${i}/${TOTAL}] ✓ done             `)
    } catch (e) {
      failed++
      console.error(`\n[${i}/${TOTAL}] FAILED: ${e.message}`)
    }

    // 300ms pause between calls
    await new Promise(r => setTimeout(r, 300))
  }

  console.log(`\n\nFinished. Done: ${done}  Failed: ${failed}`)
}

main()
