import { BrowserRouter, useNavigate } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './app';

(window as any).__APP_ENV_ = import.meta.env;
const AppRouter = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <AppRouter />
);
