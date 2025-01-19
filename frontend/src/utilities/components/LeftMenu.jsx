import React, { useEffect, useState } from 'react';
import FetchAllUsers from '../api/AllUsers';
import { HOST_NAME } from '../../constants/hostname';
export default function LeftMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [allUsersData, setAllUsersData] = useState([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const allUsersDataResponse = await FetchAllUsers();
        setAllUsersData(allUsersDataResponse.users);
        console.log("All users fetched:", allUsersDataResponse);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchAllUsers();
  }, []);

  return (
    <>

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
            <br />
            <b>Chat with:</b>
    
            {allUsersData.length > 0 ? (
              allUsersData.map((user, index) => (
                <li key={index} className="flex items-center space-x-4">

                  <img
                    src={
                      user.profile_picture
                        ? `${HOST_NAME}${user.profile_picture}`
                        : 'https://cdn-icons-png.flaticon.com/512/17/17004.png'
                    }
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                  {/* User Info */}
                  <a href={`/chat/${user.username}`} className="block text-gray-300 hover:text-white">
                    {user.username} <span className="text-gray-500"></span>
                  </a>
                </li>
              ))
            ) : (
              <p className="text-gray-400">No users available</p>
            )}
          </ul>
        </div>
      </div>


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
