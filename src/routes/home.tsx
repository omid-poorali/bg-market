import { lazy } from 'react';
import { Layouts } from 'components';
import * as Utils from 'utils';

export const main = Utils.Route.create({
  element: Layouts.Main,
  path: '/'
});


export const index = Utils.Route.create(
  {
    element: lazy(() => import('../pages/Home')),
    path: '/',
  }, main);
