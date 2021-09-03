import { lazy } from 'react';

const Element = lazy(() => import('./Element'))
const Shuffle = lazy(() => import('./Shuffle'))
const Groups = lazy(() => import('./Groups'))

export {
  Element,
  Shuffle,
  Groups
}