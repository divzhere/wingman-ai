import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppRouter } from './routes';
import { AuthProvider } from './contexts/AuthContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  </StrictMode>
);