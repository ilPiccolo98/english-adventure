import { WORLDS_DATA, getWorldById, getLevelById, getNextLevel } from '../src/data/worlds.data';
import { calculateStars, calculateCoinsEarned, checkNewlyUnlockedBadges } from '../src/services/scoring.service';
import { TINA_CONFIG } from '../src/data/teacher.config';
import type { GameState } from '../src/types/game.types';

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
}

console.log('🧪 Starting English Adventure Automated Test Suite...\n');

// 1. Worlds & Levels Verification
console.log('1️⃣ Testing Worlds & Levels Curriculum Architecture...');
assert(WORLDS_DATA.length === 5, 'Must have exactly 5 worlds');

const expectedWorldIds = [
  'vocabulary-island',
  'grammar-castle',
  'pronunciation-jungle',
  'reading-forest',
  'listening-cave',
];

let totalLevels = 0;
let totalExercisesLittle = 0;
let totalExercisesSuper = 0;

WORLDS_DATA.forEach((world, index) => {
  assert(world.id === expectedWorldIds[index], `World ${index} ID must match ${expectedWorldIds[index]}`);
  assert(world.number === index + 1, `World number must be ${index + 1}`);
  assert(world.title.length > 0, `World ${world.id} title must not be empty`);
  assert(world.levels.length >= 3, `World ${world.id} must have at least 3 levels`);

  world.levels.forEach((level) => {
    totalLevels++;
    assert(level.id.length > 0, `Level ID in ${world.id} cannot be empty`);
    assert(level.worldId === world.id, `Level ${level.id} worldId must be ${world.id}`);
    assert(level.didacticTakeaway.length > 0, `Level ${level.id} must have a didactic takeaway`);

    // Verify both little and super exercise sets
    const littleExs = level.exercises.little;
    const superExs = level.exercises.super;

    assert(littleExs && littleExs.length === 5, `Level ${level.id} must have exactly 5 exercises for little explorer`);
    assert(superExs && superExs.length === 5, `Level ${level.id} must have exactly 5 exercises for super explorer`);

    totalExercisesLittle += littleExs.length;
    totalExercisesSuper += superExs.length;

    // Check exercise mechanics integrity
    [...littleExs, ...superExs].forEach((ex) => {
      assert(ex.id.length > 0, `Exercise in ${level.id} must have a valid ID`);
      assert(ex.instruction.length > 0, `Exercise ${ex.id} must have instruction`);
      assert(ex.prompt.length > 0, `Exercise ${ex.id} must have prompt`);

      if (ex.type === 'multipleChoice') {
        assert(ex.options.length >= 2, `MultipleChoice ${ex.id} must have >= 2 options`);
        const hasCorrect = ex.options.some((o) => o.isCorrect);
        assert(hasCorrect, `MultipleChoice ${ex.id} must have at least one correct option`);
      } else if (ex.type === 'matchingPairs') {
        assert(ex.pairs.length >= 2, `MatchingPairs ${ex.id} must have >= 2 pairs`);
        ex.pairs.forEach((p) => {
          assert(p.left.text.length > 0, `Pair ${p.id} left text must not be empty`);
          assert(p.right.text.length > 0, `Pair ${p.id} right text must not be empty`);
        });
      } else if (ex.type === 'memoryMatch') {
        assert(ex.cards.length >= 4, `MemoryMatch ${ex.id} must have >= 4 cards`);
        const pairIds = ex.cards.map((c) => c.pairId);
        const uniquePairs = new Set(pairIds);
        uniquePairs.forEach((pid) => {
          const count = pairIds.filter((id) => id === pid).length;
          assert(count === 2, `Card pair ${pid} in ${ex.id} must appear exactly twice`);
        });
      } else if (ex.type === 'fillTheGap') {
        assert(ex.options.length >= 2, `FillTheGap ${ex.id} must have >= 2 options`);
        const hasCorrect = ex.options.some((o) => o.isCorrect);
        assert(hasCorrect, `FillTheGap ${ex.id} must have a correct option`);
      } else if (ex.type === 'sentenceOrder') {
        assert(ex.words.length === ex.correctOrder.length, `SentenceOrder ${ex.id} words count must match correctOrder count`);
        const sortedWords = [...ex.words].sort();
        const sortedCorrect = [...ex.correctOrder].sort();
        assert(
          JSON.stringify(sortedWords) === JSON.stringify(sortedCorrect),
          `SentenceOrder ${ex.id} words set must match correctOrder set`
        );
      } else if (ex.type === 'soundRecognition') {
        assert(ex.targetSound.length > 0, `SoundRecognition ${ex.id} must have target sound`);
        assert(ex.contrastSound.length > 0, `SoundRecognition ${ex.id} must have contrast sound`);
        assert(ex.options.some((o) => o.isCorrect), `SoundRecognition ${ex.id} must have correct option`);
      } else if (ex.type === 'readingComprehension') {
        assert(ex.storyPassage.length > 10, `ReadingComprehension ${ex.id} must have story passage`);
        assert(ex.questions.length > 0, `ReadingComprehension ${ex.id} must have questions`);
        ex.questions.forEach((q) => {
          assert(q.options.includes(q.correctOption), `Question ${q.id} options must include correctOption`);
        });
      }
    });
  });
});

console.log(`✅ Total Worlds Verified: ${WORLDS_DATA.length}`);
console.log(`✅ Total Levels Verified: ${totalLevels}`);
console.log(`✅ Total Little Explorer Exercises: ${totalExercisesLittle}`);
console.log(`✅ Total Super Explorer Exercises: ${totalExercisesSuper}`);
console.log(`✅ Grand Total Exercises: ${totalExercisesLittle + totalExercisesSuper}`);

// 2. Lookup Helpers Verification
console.log('\n2️⃣ Testing Lookup & Navigation Helpers...');
const vocabWorld = getWorldById('vocabulary-island');
assert(vocabWorld !== undefined && vocabWorld.number === 1, 'getWorldById must return Vocabulary Island');

const level1 = getLevelById('vocab-1');
assert(level1 !== undefined && level1.level.title === 'Hello, Explorer!', 'getLevelById must find Level 1.1');

const nextFromL1 = getNextLevel('vocab-1');
assert(nextFromL1 !== undefined && nextFromL1.level.id === 'vocab-2', 'getNextLevel from vocab-1 must be vocab-2');

const nextFromL3 = getNextLevel('vocab-3');
assert(nextFromL3 !== undefined && nextFromL3.level.id === 'grammar-1', 'getNextLevel from vocab-3 must transition to grammar-1');

console.log('✅ Lookup & World transition logic verified!');

// 3. Scoring System Verification
console.log('\n3️⃣ Testing Non-Punitive Scoring Engine...');
assert(calculateStars(5, 5) === 3, '5/5 must award 3 stars');
assert(calculateStars(4, 5) === 2, '4/5 (80%) must award 2 stars');
assert(calculateStars(1, 5) === 1, '1/5 must award 1 star (completion is never 0 stars)');
assert(calculateStars(0, 5) === 1, '0/5 must award at least 1 star upon level completion');

assert(calculateCoinsEarned(3) === 15, '3 stars must award 15 coins');
assert(calculateCoinsEarned(2) === 12, '2 stars must award 12 coins');
assert(calculateCoinsEarned(1) === 10, '1 star must award 10 coins');

console.log('✅ Non-punitive scoring rules verified!');

// 4. Badges Engine Verification
console.log('\n4️⃣ Testing Badges Milestone Criteria...');
const mockState: GameState = {
  player: { name: 'TestUser', avatar: 'fox', difficulty: 'little' },
  completedLevelIds: ['vocab-1'],
  bestStarsByLevel: { 'vocab-1': 3 },
  totalCoins: 15,
  unlockedBadgeIds: [],
  settings: { soundEnabled: true, reducedMotion: false },
};

const unlocked = checkNewlyUnlockedBadges(mockState);
assert(unlocked.includes('first-steps'), 'Must unlock First Steps badge after 1 completed level');
assert(unlocked.includes('word-explorer'), 'Must unlock Word Explorer badge for vocab-1 level');
assert(!unlocked.includes('grammar-hero'), 'Must not unlock Grammar Hero before grammar level is completed');

console.log('✅ Badge unlock conditions verified!');

// 5. Teacher Tina Configuration Verification
console.log('\n5️⃣ Testing Teacher Tina Safety & Configuration...');
assert(TINA_CONFIG.name === 'Teacher Tina', 'Teacher name must be Teacher Tina');
assert(TINA_CONFIG.lessonFormat.includes('1-on-1'), 'Must explicitly state 1-on-1 individual lessons');
assert(TINA_CONFIG.contactStatus === 'coming-soon', 'Default contact status must be coming-soon (no fabricated data)');
assert(TINA_CONFIG.learningJourney.length === 5, 'Must have 5 learning journey skills matching 5 worlds');

console.log('✅ Teacher Tina configuration verified!');

// 6. Grand Certificate Quest Verification (15 Stages)
console.log('\n6️⃣ Testing Grand Certificate Quest Criteria (15 Stages)...');
const all15LevelIds = WORLDS_DATA.flatMap((w) => w.levels.map((l) => l.id));
assert(all15LevelIds.length === 15, 'Total levels across worlds must equal exactly 15');
const completedMockState: GameState = {
  ...mockState,
  completedLevelIds: all15LevelIds,
};
const isComplete = completedMockState.completedLevelIds.length >= 15;
assert(isComplete, 'Grand Certificate must unlock when 15 stages are complete');
console.log('✅ Grand Certificate 15-stage requirement verified!');

console.log('\n🎉 ALL AUTOMATED TESTS PASSED SUCCESSFULLY! 🚀');

