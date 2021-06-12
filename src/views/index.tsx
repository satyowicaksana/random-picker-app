import { lazy } from 'react';

const Home = lazy(() => import('./Home'));
const Other = lazy(() => import('./Other'));

export {
  Home,
  Other
}