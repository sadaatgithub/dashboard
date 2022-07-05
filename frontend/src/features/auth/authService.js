// making https request

import axiosInstance from "../../api/Axios";
const userLogin = "auth/jwt/create/";


//  login user

const login = async (userData) => {
  const response = await axiosInstance.post(userLogin , userData);

  if (response.data) {
    
    localStorage.setItem('user', response.data.access)
    localStorage.setItem('refresh_token', response.data.refresh)
  
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("user_detail");
  localStorage.removeItem("refresh_token")

};

const authService = {
  login,
  logout,
};
export default authService;
