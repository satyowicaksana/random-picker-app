import { lazy } from 'react';

const Home = lazy(() => import('./Home'))
const Lists = lazy(() => import('./Lists'))
const CreateList = lazy(() => import('./Lists/CreateList'))
const Numbers = lazy(() => import('./Numbers'))
const Coin = lazy(() => import('./Coin'))
const Wheel = lazy(() => import('./Wheel'))
const Dice = lazy(() => import('./Dice'))
const Cards = lazy(() => import('./Cards'))

export {
  Home,
  Lists,
  CreateList,
  Numbers,
  Coin,
  Wheel,
  Dice,
  Cards
}