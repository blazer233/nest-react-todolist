import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

(window as any).__APP_ENV_ = import.meta.env;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App />
);
