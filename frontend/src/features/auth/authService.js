// making https request

import axiosInstance from "../../api/Axios";
const userLogin = "auth/jwt/create/";

let logoutNow;

const calculateRemainingTime = () =>{
  const accessToken = localStorage.getItem('user')
  if(accessToken){
    const tokenParts = JSON.parse(atob(accessToken.split('.')[1]));
    // console.log(tokenParts.exp)
    const now = Math.ceil(Date.now() / 1000);
    const remainingTime = (tokenParts.exp - now) * 1000
    // console.log(remainingTime)

    return remainingTime
  }
}
const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("user_detail");
  localStorage.removeItem("refresh_token")
  
  console.log('logout')
  // clearTimeout(logoutNow)
  // window.location.reload()
};



//  login user
const login = async (userData) => {
  const response = await axiosInstance.post(userLogin , userData);

  if (response.data) {
    localStorage.setItem('user', response.data.access)
    localStorage.setItem('refresh_token', response.data.refresh)
  
  }
  // autoLogout()

  return response.data;
};

const autoLogout = () =>{
  const remainingTime = calculateRemainingTime()
  console.log(remainingTime)
  logoutNow = setTimeout(logout,remainingTime)
}



const authService = {
  login,
  logout,
  autoLogout,
};
export default authService;
