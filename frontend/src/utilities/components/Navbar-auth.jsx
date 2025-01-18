import React from "react";
import { useNavigate, useLocation } from 'react-router-dom';

export default function NavbarAuth() {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

  const isLoginPage = location.pathname === '/loginpage'; // Check if it's the login page
  const isRegisterPage = location.pathname === '/registerpage'; // Check if it's the register page

  return (
    <nav className="fixed top-0 left-0 right-0 h-24 bg-gray-800 text-white shadow-lg z-50">
      <div className="flex justify-between items-center h-full px-4">
        <div className="text-xl font-bold">90 NORTH ASSIGNMENT WEBSITE</div>

        <div className="flex items-center space-x-4">
          {isLoginPage && (
            <button
              onClick={() => navigate('/registerpage')}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Register
            </button>
          )}

          {isRegisterPage && (
            <button
              onClick={() => navigate('/loginpage')}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
