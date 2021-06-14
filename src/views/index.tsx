import { lazy } from 'react';

const Navbar = lazy(() => import('./Navbar'))
const Home = lazy(() => import('./Home'))
const Numbers = lazy(() => import('./Numbers'))
const Coin = lazy(() => import('./Coin'))

export {
  Navbar,
  Home,
  Numbers,
  Coin
}