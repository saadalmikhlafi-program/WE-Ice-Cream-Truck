const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const projectRoot = path.join(__dirname, '..');
const brandsDir = path.join(projectRoot, 'public/images/brands');
const outputDir = brandsDir;

async function removeWhiteBackground(inputFile, outputFile) {
  // Load image, convert to PNG with alpha channel
  const image = sharp(inputFile);
  const { data, info } = await image
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const pixels = new Uint8Array(data);

  // Threshold for "white" detection
  const THRESHOLD = 240;

  for (let i = 0; i < width * height; i++) {
    const r = pixels[i * channels + 0];
    const g = pixels[i * channels + 1];
    const b = pixels[i * channels + 2];
    const isWhite = r >= THRESHOLD && g >= THRESHOLD && b >= THRESHOLD;
    if (isWhite) {
      pixels[i * channels + 3] = 0; // Set alpha to 0 (transparent)
    }
  }

  const pngOutput = outputFile.replace(/\.(avif|jpg|jpeg|webp)$/i, '.png');
  await sharp(Buffer.from(pixels), { raw: { width, height, channels } })
    .png()
    .toFile(pngOutput);

  console.log(`✅ Saved: ${path.basename(pngOutput)}`);
  return pngOutput;
}

async function main() {
  const files = fs.readdirSync(brandsDir).filter(f => /\.(avif|jpg|jpeg|webp)$/i.test(f));
  
  for (const file of files) {
    const inputPath = path.join(brandsDir, file);
    console.log(`Processing: ${file}`);
    await removeWhiteBackground(inputPath, inputPath);
  }

  console.log('\nDone! All brand images have been processed.');
}

main().catch(console.error);
