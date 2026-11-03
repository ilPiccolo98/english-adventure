import React from 'react';
import { createHashRouter, RouterProvider, Navigate } from 'react-router-dom';
import { WelcomePage } from './features/welcome/WelcomePage';
import { PlayerSetupPage } from './features/player/PlayerSetupPage';
import { WorldMapPage } from './features/world-map/WorldMapPage';
import { WorldDetailPage } from './features/worlds/WorldDetailPage';
import { ExercisePage } from './features/exercises/ExercisePage';
import { ResultsPage } from './features/rewards/ResultsPage';
import { TeacherPage } from './features/teacher/TeacherPage';
import { CertificatePage } from './features/certificate/CertificatePage';

// We use createHashRouter for 100% reliable static hosting on GitHub Pages / Cloudflare Pages
// without requiring complex server-side fallback rules!
const router = createHashRouter([
  {
    path: '/',
    element: <WelcomePage />,
  },
  {
    path: '/play/setup',
    element: <PlayerSetupPage />,
  },
  {
    path: '/map',
    element: <WorldMapPage />,
  },
  {
    path: '/world/:worldId',
    element: <WorldDetailPage />,
  },
  {
    path: '/level/:levelId',
    element: <ExercisePage />,
  },
  {
    path: '/results/:levelId',
    element: <ResultsPage />,
  },
  {
    path: '/parents',
    element: <TeacherPage />,
  },
  {
    path: '/certificate',
    element: <CertificatePage />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

export const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};
