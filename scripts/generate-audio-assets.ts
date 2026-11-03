import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { WORLDS_DATA } from '../src/data/worlds.data.ts';

const audioDir = path.resolve(process.cwd(), 'public/audio');
if (!fs.existsSync(audioDir)) {
  fs.mkdirSync(audioDir, { recursive: true });
}

const phrases = new Set<string>();

// 1. Collect all phrases from game curriculum
WORLDS_DATA.forEach(world => {
  world.levels.forEach(level => {
    ['little', 'super'].forEach(diff => {
      const exercises = (level.exercises as any)[diff] || [];
      exercises.forEach((ex: any) => {
        if (ex.audioText && typeof ex.audioText === 'string') {
          phrases.add(ex.audioText.trim());
        }
        if (ex.storyPassage && typeof ex.storyPassage === 'string') {
          phrases.add(ex.storyPassage.trim());
        }
        if (ex.playedWord && typeof ex.playedWord === 'string') {
          phrases.add(ex.playedWord.trim());
        }
      });
    });
  });
});

// Additional common game voice clips
const extraPhrases = [
  "Hello! I am Tina Teacher! Let's learn English together!",
  "Amazing!",
  "Great job!",
  "Try again!",
  "Welcome, Explorer!",
  "Vocabulary Island",
  "Grammar Castle",
  "Pronunciation Jungle",
  "Reading Forest",
  "Listening Cave"
];
extraPhrases.forEach(p => phrases.add(p.trim()));

console.log(`Starting generation for ${phrases.size} unique English audio assets...`);

function getSafeFilename(text: string): string {
  // Use sha1 hash of the normalized text for reliable filenames
  const hash = crypto.createHash('sha1').update(text.toLowerCase().trim()).digest('hex').slice(0, 12);
  // Also add a short readable prefix
  const readable = text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .slice(0, 20)
    .replace(/^-+|-+$/g, '');
  return `${readable || 'audio'}-${hash}.mp3`;
}

const manifest: Record<string, string> = {};

async function fetchWithRetry(text: string, retries = 3): Promise<Buffer> {
  const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=en&client=tw-ob`;
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
      });
      if (res.ok) {
        const arrayBuf = await res.arrayBuffer();
        return Buffer.from(arrayBuf);
      }
    } catch {
      await new Promise(r => setTimeout(r, 500));
    }
  }
  throw new Error(`Failed to fetch audio for: "${text}"`);
}

async function run() {
  const list = Array.from(phrases);
  let count = 0;

  for (const text of list) {
    const filename = getSafeFilename(text);
    const filePath = path.join(audioDir, filename);
    const relUrl = `./audio/${filename}`;

    manifest[text.toLowerCase().trim()] = relUrl;

    if (!fs.existsSync(filePath) || fs.statSync(filePath).size === 0) {
      try {
        const buffer = await fetchWithRetry(text);
        fs.writeFileSync(filePath, buffer);
        count++;
        process.stdout.write(`Downloaded (${count}/${list.length}): ${text.slice(0, 30)}...\r`);
      } catch (err) {
        console.error(`\nError downloading "${text}":`, err);
      }
      // Small delay to be polite
      await new Promise(r => setTimeout(r, 80));
    } else {
      count++;
    }
  }

  const manifestPath = path.resolve(process.cwd(), 'src/data/audio-manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8');
  console.log(`\n✅ Finished generating ${list.length} native English audio files in public/audio/!`);
  console.log(`✅ Manifest saved to ${manifestPath}`);
}

run();

