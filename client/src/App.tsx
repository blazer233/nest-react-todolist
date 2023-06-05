import { useNavigate, useRoutes } from 'react-router-dom';
import React, { Key } from 'react';
import { routes } from './routes';
import { Button } from 'antd';

export default () => {
  const navigate = useNavigate();
  const routing = useRoutes(routes);
  return (
    <>
      {routes.map(
        (i: any, idx: Key) =>
          i.menu && (
            <Button
              type="primary"
              onClick={() => navigate(i.path)}
              key={idx}
              style={{ margin: '12px' }}
            >
              MENU_{i.menu}
            </Button>
          )
      )}
      <React.Suspense fallback={<div>Loading...</div>}>
        {routing}
      </React.Suspense>
    </>
  );
};
