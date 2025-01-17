import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import Homepage from './pages/auth/Homepage';
import Navbar from './utilities/components/Navbar';
import LeftMenu from './utilities/components/LeftMenu';
import MainContent from './pages/MainContent';
import RightPanel from './utilities/components/Rightpanel';
import Footer from './utilities/components/Footer';

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

  const isAuthPage = location.pathname === '/loginpage/' || location.pathname === '/registerpage';

  return (
    <div className="w-full h-full overflow-hidden">
      {!isAuthPage ? (
        <div className="flex flex-col h-screen">
          {/* Navbar */}
          <div className="fixed top-0 left-0 right-0 h-20 z-50">
            <Navbar />
          </div>

          {/* Content Container */}
          <div className="flex flex-1 pt-16 pb-16"> {/* Added pb-16 for footer space */}
            {/* Left Menu */}
            <div className="fixed top-16 left-0 bottom-16 w-64"> {/* Changed bottom-0 to bottom-16 */}
              <LeftMenu />
            </div>

            {/* Main Content */}
            <div className="flex-1 ml-64 mr-72">
              <div className="h-full">
                <MainContent />
              </div>
            </div>

            {/* Right Panel */}
            <div className="fixed top-16 right-0 bottom-16 w-72"> {/* Changed bottom-0 to bottom-16 */}
              <RightPanel />
            </div>
          </div>

          {/* Footer - Now extends full width */}
          <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t z-40">
            <Footer />
          </div>
        </div>
      ) : (
        <MainContent />
      )}
    </div>
  );
}

export default App;