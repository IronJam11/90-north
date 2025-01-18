import React, { useEffect, useState } from "react";
import fetchUserDetails from "../api/FetchUserDetails";
import handleLogout from "../api/handleLogout";
import { useNavigate } from 'react-router-dom';
import FetchAllUsers from "../api/AllUsers";


export default function Navbar() {
  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {

    // Fetch user details to get the profile picture
    const getUserDetails = async () => {
      const userDetails = await fetchUserDetails();
      console.log(userDetails);
      if (userDetails) {
        setProfilePicture(userDetails.profile_picture);
      }
    };

    getUserDetails();
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 h-24 bg-gray-800 text-white shadow-lg z-50">
      <div className="flex justify-between items-center h-full px-4">
        {/* Website Name */}
        <div className="text-xl font-bold">90 NORTH ASSIGNMENT WEBSITE</div>

        {/* Profile Picture and Logout Button */}
        <div className="flex items-center space-x-4">
          {/* Show Profile Picture if available */}
          {profilePicture && (
            <img
              src={`http://127.0.0.1:8000/${userData.profile_picture}`}
              alt="Profile"
              className="w-10 h-10 rounded-full border border-white-300"
            />
          )}

          {/* Logout Button */}
          <button
            onClick={() => handleLogout(navigate)}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
