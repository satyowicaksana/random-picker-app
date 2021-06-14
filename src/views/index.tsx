import { lazy } from 'react';

const Navbar = lazy(() => import('./Navbar'))
const Home = lazy(() => import('./Home'))
const Numbers = lazy(() => import('./Numbers'))
const Coin = lazy(() => import('./Coin'))
const Wheel = lazy(() => import('./Wheel'))
const Dice = lazy(() => import('./Dice'))

export {
  Navbar,
  Home,
  Numbers,
  Coin,
  Wheel,
  Dice
}