import React from "react";
import axios from 'axios';
import Cookies from 'js-cookie';
import { HOST_NAME } from '../../constants/hostname';
const handleLogin = async (e, email, password, navigate) => {
  e.preventDefault();
  try {
    const response = await axios.post(`${HOST_NAME}/users/login/`, {
      email,
      password,
    }, {
      withCredentials: true, 
    });
    console.log(response.data);
    const refreshToken = response.data['refresh-token'];
    const accessToken = response.data['access-token'];
    const username = response.data['username'];
    Cookies.set('accessToken', accessToken, {
      expires: 1,         
      path: '/',           
      sameSite: 'Lax',     
      secure: true,        
    });

    Cookies.set('refreshToken', refreshToken, {
      expires: 7,        
      path: '/',        
      sameSite: 'Lax',
      secure: true,      
    });
    Cookies.set('username', username, {
      expires: 7,          
      path: '/',         
      sameSite: 'Lax',
      secure: true,   
    });
    navigate('/');
  } catch (error) {
    alert("Invalid credentials!!!");
    console.error('Error during login:', error);
  }
};

export default handleLogin;
