import { CategoriesNavbar } from './CategoriesNavbar';
import { TopBarSection } from './TopBarSection';
import { Outlet } from 'react-router-dom';

export function App() {
  return (
    <>
      <TopBarSection />
      <CategoriesNavbar />
      <Outlet />
    </>
  );
}
