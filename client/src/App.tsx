import { useNavigate, useRoutes } from 'react-router-dom';
import React, { Key } from 'react';
import { routesAll } from './routes';
import { Button } from 'antd';

export default () => {
  const navigate = useNavigate();
  const routing = useRoutes(routesAll);
  return (
    <>
      {routesAll.map(
        (i: any, idx: Key) =>
          i.routePath && (
            <Button
              type="primary"
              onClick={() => navigate(i.path)}
              key={idx}
              style={{ margin: '12px' }}
            >
              MENU_{i.routePath}
            </Button>
          )
      )}
      <React.Suspense fallback={<div>Loading...</div>}>
        {routing}
      </React.Suspense>
    </>
  );
};
