import { lazy } from 'react';

const Home = lazy(() => import('./Home'));
const Numbers = lazy(() => import('./Numbers'));

export {
  Home,
  Numbers
}