import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'

export default function Homepage() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/users/user-details/',{
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${Cookies.get('accessToken')}`,
      }
    }) 
      .then(response => {
        setUserData(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-xl text-gray-500">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-xl text-red-500">{error}</span>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex items-center p-6">
          <img
            src={`http://127.0.0.1:8000${userData.profile_picture}`|| 'https://via.placeholder.com/150'}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-gray-200"
          />
          <div className="ml-6">
            <h2 className="text-2xl font-semibold text-gray-800">{userData.username}</h2>
            <p className="text-sm text-gray-500">{userData.bio}</p>
          </div>
        </div>
        <div className="p-6 border-t border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800">Contact Information</h3>
          <ul className="mt-4 text-gray-600">
            <li>Email: {userData.email}</li>
            {/* Add other fields as necessary */}
          </ul>
        </div>
      </div>
    </div>
  );
}
