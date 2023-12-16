export type SystemRoute = {
  absolutePath: string;
  path: string;
  element?: React.ComponentType | React.LazyExoticComponent<() => JSX.Element>;
  /**
   * The Children of the route
   */
  subRoutes: SystemRoute[];
};

/**
 * Create a Route for the Application
 * @param inputs - Contains the path, access and the Component
 * @param base - if new route is going to be child of another route
 * @returns Object contains the information of new route
 */
export const create = (
  inputs: Pick<SystemRoute, 'path' | 'element'>,
  base?: SystemRoute,
): SystemRoute => {

  if (base) {
    const newRoute = {
      path: inputs.path,
      element: inputs.element,
      absolutePath: `${base.absolutePath}/${inputs.path}`.replace(/\/+/g, '/'),
      subRoutes: [],
    };

    // eslint-disable-next-line no-param-reassign
    base.subRoutes = base.subRoutes.concat([newRoute]);

    return newRoute;
  }

  return {
    path: inputs.path,
    element: inputs.element,
    absolutePath: inputs.path,
    subRoutes: [],
  };
};
