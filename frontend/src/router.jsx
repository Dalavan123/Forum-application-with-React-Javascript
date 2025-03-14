import { createBrowserRouter, Outlet } from 'react-router-dom';
import { App } from './components/App';
import { CategoryDetailsView } from './views/CategoryDetailsView';
import { ThreadDetailsView } from './views/ThreadDetailsView';
import { HomeView } from './views/HomeView';

export const router = createBrowserRouter([
  {
    element: <App />,
    path: '/',

    children: [
      {
        element: <HomeView />,
        index: true,
      },
      {
        element: <Outlet />,
        path: '/categories/:category_id',
      },
      {
        element: <ThreadDetailsView />,
        path: '/categories/:category_id/threads/:threads_id',
      },

      {
        element: <CategoryDetailsView />,
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
