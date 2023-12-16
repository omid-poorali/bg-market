import * as Utils from 'utils';
import NotFound from 'pages/errors/NotFound';

export const notFound = Utils.Route.create({
  element: NotFound,
  path: '*'
});
