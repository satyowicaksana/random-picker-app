import { lazy } from 'react';

const Navbar = lazy(() => import('./Navbar'));
const Home = lazy(() => import('./Home'));
const Numbers = lazy(() => import('./Numbers'));

export {
  Navbar,
  Home,
  Numbers
}