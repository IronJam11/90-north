import React from "react";
import axios from 'axios';
import Cookies from 'js-cookie';

const FetchAllUsers = async (e, email, password, navigate) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://127.0.0.1:8000/users/all-users/', {
    }, {
      withCredentials: true, // Send credentials with the request
    });
    console.log("all users", response.data);
    navigate('/');
  } catch (error) {
    // alert("Invalid credentials!!!");
    console.error('Error during login:', error);
  }
};

export default FetchAllUsers;
