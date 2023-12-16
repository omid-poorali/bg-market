import * as Home from './home';
import { notFound } from './errors';

//----------------------------------------------
export * as Home from './home';

export const all = [
  Home.main,
  // must be the last one
  notFound,
];
