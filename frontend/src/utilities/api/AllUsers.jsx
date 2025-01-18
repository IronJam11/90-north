import React from "react";
import axios from 'axios';
import Cookies from 'js-cookie';
import { HOST_NAME } from '../../constants/hostname';


const FetchAllUsers = async () => {

  try {
    const response = await axios.get(`${HOST_NAME}users/all-users/`, {

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
