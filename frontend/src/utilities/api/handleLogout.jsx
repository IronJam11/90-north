import axios from 'axios';
import Cookies from 'js-cookie'
import { HOST_NAME } from '../../constants/hostname';
export const handleLogout = async (navigate) => {

    const refreshToken = Cookies.get('refreshToken');

  try {
    // Send the refresh token in the body for logout
    const response = await axios.post(`${HOST_NAME}/users/logout/`, {
      refresh_token: refreshToken 
    }, {
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${Cookies.get('accessToken')}`,
      }
    });
    console.log("response", response.data);
    Cookies.remove('accessToken'); 
    Cookies.remove('refreshToken');
    Cookies.remove('jwt');
    Cookies.remove('username');
    alert("You have successfully logged out!");
    navigate('/loginpage');

  } catch (err) {
    console.error('Error during logout:', err.response ? err.response.data : err.message);
  }
};

export default handleLogout;
