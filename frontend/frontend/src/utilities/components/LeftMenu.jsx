import React, { useEffect, useState } from 'react';
import fetchUserDetails from '../api/FetchUserDetails';

export default function LeftMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [allUsersData, setAllUsersData] = useState([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      const allUsersDataResponse = await fetchUserDetails();
      setAllUsersData(allUsersDataResponse.users);
      console.log("all users",allUsersDataResponse);
    }
    fetchAllUsers();
  },[]);
    

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-24 bottom-0 left-0 h-full bg-gray-800 text-white shadow-lg transition-transform duration-300 
          w-64 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="p-4">
          <ul className="space-y-4">
            <li>
              <a href="/" className="block text-gray-300 hover:text-white">
                HomePage
              </a>
            </li>
            <li>
              <a href="#" className="block text-gray-300 hover:text-white">
                Menu Item 2
              </a>
            </li>
            <li>
              <a href="#" className="block text-gray-300 hover:text-white">
                Menu Item 3
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-1/2 left-0 transform -translate-y-1/2 bg-gray-600 text-white p-3 rounded-r-md shadow-md z-50 
          hover:bg-red-700 focus:outline-none"
      >
        {isOpen ? '←' : '→'}
      </button>
    </>
  );
}
