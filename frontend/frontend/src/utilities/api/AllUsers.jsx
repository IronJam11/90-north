import React from "react";
import axios from 'axios';
import Cookies from 'js-cookie';

const FetchAllUsers = async (e, email, password, navigate) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://127.0.0.1:8000/users/login/', {
    }, {
      withCredentials: true, // Send credentials with the request
    });

    // Extract tokens from response
    console.log(response.data);
    const refreshToken = response.data['refresh-token'];
    const accessToken = response.data['access-token'];
    Cookies.set('accessToken', accessToken, {
      expires: 1,          // Cookie expiration in days (1 day)
      path: '/',           // Available across the entire site
      sameSite: 'Lax',     // Prevent CSRF attacks, adjust based on your requirements
      secure: true,        // Set to true if using HTTPS
    });

    Cookies.set('refreshToken', refreshToken, {
      expires: 7,          // Typically, refresh tokens last longer (e.g., 7 days)
      path: '/',           // Available across the entire site
      sameSite: 'Lax',
      secure: true,        // Set to true if using HTTPS
    });
    navigate('/');
  } catch (error) {
    // alert("Invalid credentials!!!");
    console.error('Error during login:', error);
  }
};

export default FetchAllUsers;
