import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import Dashboard from '../pages/Dashboard';
import Bookings from '../pages/Bookings';
import Providers from '../pages/Providers';
import Reviews from '../pages/Reviews';
import Settings from '../pages/Settings';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'bookings', element: <Bookings /> },
      { path: 'providers', element: <Providers /> },
      { path: 'reviews', element: <Reviews /> },
      { path: 'settings', element: <Settings /> },
    ],
  },
]);

export default router;