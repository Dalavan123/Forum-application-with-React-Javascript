import { createBrowserRouter, Outlet } from 'react-router-dom';
import { App } from './components/App';
import { ThreadsView } from './views/ThreadsView';
import { ThreadDetailsView } from './views/ThreadDetailsView';

export const router = createBrowserRouter([
  {
    element: <App />,
    path: '/',

    children: [
      {
        element: <ThreadDetailsView />,
        path: '/categories/:category_id/threads/:threads_id',
      },

      {
        element: <ThreadsView />,
        path: '/categories/:category_id/threads',
      },

      {
        element: (
          <section>
            <h1>404 Page. The URL does not have any matches</h1>
          </section>
        ),
        path: '*',
      },
    ],
  },
]);
