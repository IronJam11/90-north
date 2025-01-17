import React from "react";
import axios from 'axios';
import Cookies from 'js-cookie';

const FetchAllUsers = async () => {

  try {
    const response = await axios.get('http://127.0.0.1:8000/users/all-users/', {

      headers: {
        'Authorization': `Bearer ${Cookies.get('accessToken')}`,
      }
    });
    console.log("all users", response.data);
    return response.data;
  } catch (error) {
    // alert("Invalid credentials!!!");
    console.error('Error during login:', error);
  }
};

export default FetchAllUsers;
