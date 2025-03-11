import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { CategoriesNavbar } from './components/CategoriesNavbar';
import { TopBarSection } from './components/TopBarSection';
import { ThreadsView } from './views/ThreadsView';

const AppLayout = () => {
  return (
    <div>
      <TopBarSection />
      <CategoriesNavbar />
      <Outlet />
    </div>
  );
};

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AppLayout />}>
          <Route path='/' element={<div>Home Page</div>} />
          <Route
            path='/categories/:category_id/threads'
            element={<ThreadsView />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
