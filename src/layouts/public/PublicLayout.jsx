import { Outlet } from 'react-router-dom';
import Header from '../../components/public/Header';
import Footer from '../../components/public/Footer';

const PublicLayout = () => {
  return (
    <>
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default PublicLayout;