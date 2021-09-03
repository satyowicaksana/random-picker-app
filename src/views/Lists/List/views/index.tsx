import { lazy } from 'react';

const Element = lazy(() => import('./Element'))
const Shuffle = lazy(() => import('./Shuffle'))

export {
  Element,
  Shuffle
}