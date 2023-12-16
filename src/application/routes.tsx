import React, { Suspense } from 'react';
import {
  BrowserRouter, Route, Routes,
} from 'react-router-dom';
import { SystemRoute } from 'utils/route';
import * as MyRoutes from 'routes';
import * as Views from './views';

export function AppRoutes() {
  const renderRoutes = (routes: SystemRoute[]) => (
    <>
      {React.Children.toArray(
        routes.map((route) => route.element && (
          <Route path={route.path} element={
            <Suspense fallback={<Views.Loading />}>
              {React.createElement(route.element)}
            </Suspense>}>
            {renderRoutes(route.subRoutes)}
          </Route>
        )),
      )}
    </>
  );

  return (
    <BrowserRouter>
      <Routes>{renderRoutes(MyRoutes.all)}</Routes>
    </BrowserRouter>
  );
}