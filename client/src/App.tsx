import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import TodoList from './todolist';
import Editor from './editor';
import { Button } from 'antd';

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', Component: TodoList, name: 'Todolist' },
  { path: '/editor', Component: Editor, name: 'rich text' },
];
const AppRouter = () => {
  const navigate = useNavigate();
  return (
    <>
      {routes.map(
        (i, idx) =>
          i.name && (
            <Button
              onClick={() => navigate(i.path)}
              key={idx}
              style={{ margin: '12px' }}
            >
              {i.name}
            </Button>
          )
      )}
      <Routes>
        {routes.map((i, idx) => {
          const { redirect, path, Component } = i;
          if (redirect) {
            return (
              <Route
                key={idx}
                path={path}
                element={<Navigate to={redirect} replace />}
              />
            );
          }
          if (Component) {
            return <Route key={idx} path={path} element={<Component />} />;
          }
          return null;
        })}
      </Routes>
    </>
  );
};

export default AppRouter;
