import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './styles/index.css';
import { router } from './router';
import { ThreadProvider } from './context/ThreadContext';

createRoot(document.getElementById('root')).render(
  <ThreadProvider>
    <RouterProvider router={router} />
  </ThreadProvider>
);
