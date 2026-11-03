import { WORLDS_DATA } from '../src/data/worlds.data.ts';

const phrases = new Set<string>();

WORLDS_DATA.forEach(world => {
  world.levels.forEach(level => {
    ['little', 'super'].forEach(diff => {
      const exercises = (level.exercises as any)[diff] || [];
      exercises.forEach((ex: any) => {
        if (ex.audioText) phrases.add(ex.audioText.trim());
        if (ex.storyPassage) phrases.add(ex.storyPassage.trim());
        if (ex.playedWord) phrases.add(ex.playedWord.trim());
      });
    });
  });
});

// Also include key test phrases
phrases.add("Hello! I am Tina Teacher! Let's learn English together!");

console.log('Total key audio phrases:', phrases.size);
const sorted = Array.from(phrases).sort();
console.log(JSON.stringify(sorted, null, 2));
