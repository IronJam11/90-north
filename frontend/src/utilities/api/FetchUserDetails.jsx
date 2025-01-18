import React from "react";
import axios from 'axios';
import Cookies from 'js-cookie';
import { HOST_NAME } from '../../constants/hostname';

const fetchUserDetails = async () => {
  try {
    const response = await axios.get(`${HOST_NAME}users/user-details/`, {
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
