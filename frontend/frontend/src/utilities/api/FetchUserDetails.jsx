import React from "react";
import axios from 'axios';
import Cookies from 'js-cookie';

const fetchUserDetails = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/users/user-details/', {
      withCredentials: true, // Send credentials with the request
      headers: {
        'Authorization': `Bearer ${Cookies.get('accessToken')}`,
      }
    });
    // Extract tokens from response
    console.log("response", response.data);
    return response.data;
  } catch (error) {
    // alert("Invalid credentials!!!");
    console.error('Error during login:', error);
    return null; 
  }
};

export default fetchUserDetails;
