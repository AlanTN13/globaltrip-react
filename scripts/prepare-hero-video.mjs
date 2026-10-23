import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const assetRoot = new URL('../assets/hero-desktop/', import.meta.url);
const parts = ['globaltrip-hero-desktop.mp4.part1', 'globaltrip-hero-desktop.mp4.part2'];
const video = Buffer.concat(parts.map((part) => readFileSync(new URL(part, assetRoot))));
const expected = 'cdd5fa7f8d09dff397dda5e8234f149315fc1338b5b30a8662ccbfc98c950c1a';
if (createHash('sha256').update(video).digest('hex') !== expected) {
    throw new Error('The desktop hero video failed its integrity check.');
}
const output = new URL('../public/videos/globaltrip-hero-desktop.mp4', import.meta.url);
mkdirSync(fileURLToPath(new URL('.', output)), { recursive: true });
writeFileSync(output, video);
console.log('Desktop hero video prepared: ' + video.length + ' bytes; SHA256 verified.');
