import { createBrowserRouter, Outlet } from 'react-router-dom';
import { App } from './components/App';
import { ThreadsView } from './views/ThreadsView';

export const router = createBrowserRouter([
  {
    element: <App />,
    path: '/',

    children: [
      {
        element: (
          <section>
            <h1>404 Page. The URL does not have any matches</h1>
          </section>
        ),
        path: '*',
      },
      {
        element: <ThreadsView />,
        path: '/categories/:category_id/threads',
      },
    ],
  },
]);
