import { createBrowserRouter, Outlet } from 'react-router-dom';
import { App } from './components/App';
import { CategoryDetailsView } from './views/CategoryDetailsView';
import { ThreadDetailsView } from './views/ThreadDetailsView';
import { HomeView } from './views/HomeView';
import { NewThreadView } from './views/NewThreadView';

//Skapar router för navigering
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
        element: <ThreadDetailsView />,
        path: '/categories/:category_id/threads/:thread_id',
      },

      {
        element: <CategoryDetailsView />,
        path: '/categories/:category_id/threads',
      },

      {
        element: <NewThreadView />,
        path: '/new-thread',
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
