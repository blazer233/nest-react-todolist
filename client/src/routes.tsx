import { RouteObject, Navigate } from 'react-router-dom';
import React from 'react';
const redirectRoute = [{ path: '/', element: <Navigate to="/todolist" /> }];
const pageModules = import.meta.glob('./pages/**/*.tsx');

export const routes: RouteObject[] = Object.entries(pageModules)
  .map(([path, loadPage]) => {
    const routePath = path
      .replace(/^\.\/pages\//, '')
      .replace(/\.tsx$/, '')
      .replace(/\/index$/, '');
    const LazyComponent = React.lazy(() =>
      loadPage().then((module: any) => ({ default: module.default }))
    );
    return {
      path: `/${routePath}`,
      element: <LazyComponent />,
      ...(path.endsWith('index.tsx') && { menu: routePath }),
    };
  })
  .concat(redirectRoute)
  .reverse();
