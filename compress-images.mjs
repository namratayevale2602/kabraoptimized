/**
 * One-time image compression script.
 * Resizes all large images to max 1600px wide and re-encodes at WebP quality 75.
 * Run: node compress-images.mjs
 * Only replaces the file when the output is smaller than the original.
 */
import sharp from 'sharp';
import { readdirSync, statSync, writeFileSync, unlinkSync } from 'fs';
import { join } from 'path';

const MAX_WIDTH = 1600;
const QUALITY   = 75;
const ASSET_DIR = './src/assets';

// Prevent sharp from caching file descriptors so we can overwrite input files.
sharp.cache(false);
sharp.concurrency(1);

function* walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (/\.(webp|jpg|jpeg|png)$/i.test(entry.name)) yield full;
  }
}

let totalSavedBytes = 0;
let processed = 0;
let skipped = 0;

for (const file of walk(ASSET_DIR)) {
  const origBytes = statSync(file).size;

  let meta;
  try {
    meta = await sharp(file).metadata();
  } catch {
    console.warn(`  skip (unreadable): ${file}`);
    skipped++;
    continue;
  }

  const needsResize = meta.width > MAX_WIDTH;

  let buf;
  try {
    let pipeline = sharp(file);
    if (needsResize) {
      pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
    }
    buf = await pipeline.webp({ quality: QUALITY }).toBuffer();
  } catch (err) {
    console.warn(`  skip (error): ${file} — ${err.message}`);
    skipped++;
    continue;
  }

  const newBytes = buf.length;

  if (newBytes < origBytes) {
    try {
      writeFileSync(file, buf);
    } catch (err) {
      console.warn(`  skip (write locked): ${file} — ${err.code}`);
      skipped++;
      continue;
    }
    const saved = origBytes - newBytes;
    totalSavedBytes += saved;
    processed++;
    const pct = Math.round((1 - newBytes / origBytes) * 100);
    console.log(
      `✓  ${file.replace('./src/assets/', '')}: ` +
      `${Math.round(origBytes / 1024)}KB → ${Math.round(newBytes / 1024)}KB (-${pct}%)`
    );
  } else {
    skipped++;
  }
}

const savedMB = (totalSavedBytes / 1024 / 1024).toFixed(1);
console.log(`\n✅  Done — ${processed} files compressed, ${skipped} skipped`);
console.log(`   Total saved: ${savedMB} MB`);
