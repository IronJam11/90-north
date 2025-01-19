import React, { useEffect, useState } from "react";
import fetchUserDetails from "../api/FetchUserDetails";
import handleLogout from "../api/handleLogout";
import { useNavigate } from 'react-router-dom';
import FetchAllUsers from "../api/AllUsers";
import { HOST_NAME } from "../../constants/hostname";


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

        <div className="text-xl font-bold">90 NORTH ASSIGNMENT WEBSITE</div>


        <div className="flex items-center space-x-4">
         
          {profilePicture && (
            <img
              src={profilePicture ? `${HOST_NAME}${profilePicture}`: 'https://cdn-icons-png.flaticon.com/512/17/17004.png'}
              alt="Profile"
              className="w-10 h-10 rounded-full border border-white-300"
            />
          )}


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
