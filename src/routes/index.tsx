import * as Home from './home';
import { notFound } from './errors';

export const all = [
  Home.main,
  // must be the last one
  notFound,
];
