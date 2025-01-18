import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './utilities/components/Navbar';
import LeftMenu from './utilities/components/LeftMenu';
import MainContent from './pages/MainContent';
import RightPanel from './utilities/components/Rightpanel';
import Footer from './utilities/components/Footer';
import NavbarAuth from './utilities/components/Navbar-auth';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();

  useEffect(() => {
    const resizePage = () => {
      const width = window.innerWidth;
      let scale = 1;

      if (width >= 992 && width <= 1600) {
        scale = 0.9;
      } else if (width >= 700 && width <= 767) {
        scale = 0.8;
      } else if (width >= 600 && width < 700) {
        scale = 0.75;
      } else if (width <= 600) {
        scale = 0.5;
      }

      document.body.style.transform = `scale(${scale})`;
      document.body.style.transformOrigin = 'top left';
      document.body.style.width = `${100 / scale}%`;
      document.body.style.height = `${100 / scale}%`;
    };

    window.addEventListener('resize', resizePage);
    resizePage();

    return () => {
      window.removeEventListener('resize', resizePage);
    };
  }, []);

  const isAuthPage = location.pathname === '/loginpage' || location.pathname === '/registerpage';

  return (
    <div className="w-full h-full overflow-hidden">
      {!isAuthPage ? (
        <div className="flex flex-col h-screen">
          <div className="fixed top-0 left-0 right-0 h-20 bg-white shadow-md">
            <Navbar />
          </div>
          <div className="flex flex-1 pt-20 pb-16 overflow-hidden">
            <div className="fixed top-20 left-0 bottom-16 w-40 ">
              <LeftMenu />
            </div>

            <div className="flex-1 ml-5 mr-70 pt-4 pb-4 overflow-auto">
              <MainContent />
            </div>

            <div className="fixed top-24 right-4 bottom-16 w-72 bg-gray-200">
              <RightPanel />
            </div>
          </div>
          <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t">
            <Footer />
          </div>
        </div>
      ) : (
        <div>
          <NavbarAuth />
          <MainContent />
        </div>
      )}
    </div>
  );
}

export default App;
