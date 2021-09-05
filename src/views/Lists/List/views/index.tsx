import { lazy } from 'react';

const Element = lazy(() => import('./Element'))
const Shuffle = lazy(() => import('./Shuffle'))
const Groups = lazy(() => import('./Groups'))
const Edit = lazy(() => import('./Edit'))

export {
  Element,
  Shuffle,
  Groups,
  Edit
}