import { Navigate } from 'react-router-dom';
import React from 'react';
export interface IRouter {
  path: string;
  element: React.ReactElement;
  routePath?: string;
  children?: IRouter[];
}

const redirectRoute: IRouter[] = [
  { path: '/', element: <Navigate to="/todolist" /> },
];

const pageModules = import.meta.glob('./pages/**/index.tsx');

const createRoute = (routePath: string, path: string, child = false) => ({
  path: child ? routePath : `/${routePath}`,
  element: React.createElement(
    React.lazy(() =>
      pageModules[path]().then((module: any) => ({
        default: module.default,
      }))
    ),
    { routePath }
  ),
  routePath,
  children: [],
});
const tmp: Record<string, any> = {};
Object.keys(pageModules)
  .sort((a, b) => {
    const aCount = (a.match(/\//g) || []).length;
    const bCount = (b.match(/\//g) || []).length;
    return aCount - bCount;
  })
  .forEach(path => {
    const routePath = path
      .replace(/^\.\/pages\//, '')
      .replace(/\.tsx$/, '')
      .replace(/\/index$/, '');
    if (routePath.split('/').length == 1) {
      tmp[routePath] = createRoute(routePath, path);
    } else {
      const [firstPath, child] = routePath.split('/');
      tmp[firstPath].children.push(createRoute(child, path, true));
    }
  });
console.log(tmp, 333);
export const routesAll = Object.values(tmp)
  .concat(redirectRoute as never)
  .reverse();
