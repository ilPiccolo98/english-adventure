import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getLevelById } from '../../data/worlds.data';
import { useGameStore } from '../../store/game.store';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { ExerciseRenderer } from './ExerciseRenderer';
import { FeedbackSheet } from './FeedbackSheet';
import { X, Volume2, VolumeX } from 'lucide-react';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';

export const ExercisePage: React.FC = () => {
  const { levelId } = useParams<{ levelId: string }>();
  const navigate = useNavigate();

  const levelInfo = getLevelById(levelId || '');
  const player = useGameStore((state) => state.player);
  const soundEnabled = useGameStore((state) => state.settings.soundEnabled);
  const toggleSound = useGameStore((state) => state.toggleSound);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isResolved, setIsResolved] = useState(false);
  const [feedbackStatus, setFeedbackStatus] = useState<'correct' | 'incorrect' | null>(null);
  const [correctFirstTryCount, setCorrectFirstTryCount] = useState(0);
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);

  if (!levelInfo) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="font-fredoka text-2xl font-bold mb-4">Level not found!</h2>
        <Button variant="purple" onClick={() => navigate('/map')}>
          Back to Map
        </Button>
      </div>
    );
  }

  const { level, world } = levelInfo;
  const exercises = level.exercises[player.difficulty] || level.exercises.little;
  const currentExercise = exercises[currentIndex];
  const totalExercises = exercises.length;

  const handleAnswerOutcome = (isFirstTryCorrect: boolean) => {
    setIsResolved(true);
    setFeedbackStatus(isFirstTryCorrect ? 'correct' : 'incorrect');
    if (isFirstTryCorrect) {
      setCorrectFirstTryCount((prev) => prev + 1);
    }
  };

  const handleContinue = () => {
    setIsResolved(false);
    setFeedbackStatus(null);

    if (currentIndex < totalExercises - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Completed level! Navigate to results screen with state
      navigate(`/results/${level.id}`, {
        state: {
          correctFirstTry: correctFirstTryCount,
          totalQuestions: totalExercises,
        },
      });
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#FFF9F0] via-[#FAF7FF] to-[#F0EDFF] flex flex-col justify-between select-none">
      {/* Top Arcade HUD Bar */}
      <header className="w-full bg-white/95 backdrop-blur-md border-b-4 border-[#6C5CE7]/20 px-4 py-3 sticky top-0 z-40 shadow-xs">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-3">
          {/* Pause / Exit button */}
          <button
            type="button"
            onClick={() => setIsExitModalOpen(true)}
            aria-label="Pause or exit level"
            className="p-2.5 rounded-2xl bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-500 transition-colors cursor-pointer border-2 border-gray-200"
          >
            <X size={20} />
          </button>

          {/* Progress bar in center */}
          <div className="flex-1 max-w-sm flex flex-col items-center gap-1">
            <div className="flex items-center gap-2 text-[11px] font-black uppercase text-[#6C5CE7] font-fredoka">
              <span>{world.title}</span>
              <span>•</span>
              <span>Stage 0{level.levelNumber}</span>
            </div>
            <ProgressBar current={currentIndex + 1} total={totalExercises} />
          </div>

          {/* Sound toggle */}
          <button
            type="button"
            onClick={toggleSound}
            aria-label="Toggle sound"
            className={`p-2.5 rounded-2xl border-2 transition-colors cursor-pointer ${
              soundEnabled
                ? 'bg-blue-50 text-[#40BFE8] border-blue-200'
                : 'bg-gray-100 text-gray-400 border-gray-200'
            }`}
          >
            {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
        </div>
      </header>

      {/* Main Arcade Exercise Area */}
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-6 flex flex-col justify-center">
        {currentExercise && (
          <ExerciseRenderer
            key={currentExercise.id}
            exercise={currentExercise}
            onAnswer={handleAnswerOutcome}
            isResolved={isResolved}
          />
        )}
      </main>

      {/* Slide-up Arcade Feedback Sheet */}
      {feedbackStatus && (
        <FeedbackSheet
          status={feedbackStatus}
          explanation={currentExercise?.explanation}
          onContinue={handleContinue}
        />
      )}

      {/* Exit Confirmation Modal */}
      <Modal
        isOpen={isExitModalOpen}
        onClose={() => setIsExitModalOpen(false)}
        title="Pause Adventure? ⏸️"
      >
        <div className="text-center py-2 space-y-4">
          <p className="font-nunito font-bold text-gray-600">
            You are doing awesome! If you leave now, you can replay this stage anytime without losing any stars!
          </p>
          <div className="flex gap-3 justify-center">
            <Button
              variant="white"
              size="md"
              onClick={() => setIsExitModalOpen(false)}
            >
              Keep Playing
            </Button>
            <Button
              variant="purple"
              size="md"
              onClick={() => navigate(`/world/${world.id}`)}
            >
              Exit to Stages
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
