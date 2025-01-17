import React, { useEffect, useState } from "react";
import fetchUserDetails from "../api/FetchUserDetails";// Import the fetchUserDetails function
import axios from "axios";
import Cookies from "js-cookie";

export default function Navbar() {
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

  const handleLogout = async () => {
    try {
      // Clear tokens from cookies
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");

      // Optionally, send a logout request to the backend
      await axios.post("http://127.0.0.1:8000/auth/logout/", {}, { withCredentials: true });

      // Redirect or refresh the page
      window.location.href = "/";
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

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
              src={profilePicture}
              alt="Profile"
              className="w-10 h-10 rounded-full border border-gray-300"
            />
          )}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
