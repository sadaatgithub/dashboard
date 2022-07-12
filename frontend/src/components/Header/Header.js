import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import { Link , useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../../features/auth/authSlice'
import { useEffect } from 'react'
import { fetchData } from '../../features/data/dataSlice'
import { fetchUser } from '../../features/user/userSlice'
import { reset as resetUser } from '../../features/user/userSlice'
import { reset as resetData } from '../../features/data/dataSlice'


const Header = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.auth)

  const onLogout = () =>{
    dispatch(logout())
    dispatch(reset())
    dispatch(resetUser())
    dispatch(resetData())
    // navigate('/')
  }


  
<<<<<<< HEAD
  // const cleartime = () =>{
  //   clearTimeout(logoutNow)
  // }

// const logoutNow = setTimeout(() => {
//       console.log("autologout timer cancel")
// }, autoLogoutTime);



 


  // if(user){
  //   const accessToken = localStorage.getItem('user')
  //   const tokenParts = JSON.parse(atob(accessToken.split('.')[1]));
  //   const now = Math.ceil(Date.now() / 1000);
  //   var autoLogoutTime = (tokenParts.exp - now) * 1000
  // }

// const autologout = () => {
//   console.log('autologout')
//   if(user){
//   const accessToken = localStorage.getItem('user')
//   if(accessToken){
//     const tokenParts = JSON.parse(atob(accessToken.split('.')[1]));
//     // console.log(tokenParts.exp)
//     const now = Math.ceil(Date.now() / 1000);
//     var autoLogoutTime = (tokenParts.exp - now) * 1000
//     console.log(autoLogoutTime)}
//     var logoutNow = setTimeout(() => {
//       onLogout()
//       console.log("autologout implemented")
//     }, autoLogoutTime);
//   }

   
  //   // return autoLogoutTime
  // }
// }


=======
>>>>>>> myexp1
useEffect(() =>{
 
  if(user){
    dispatch(fetchData())
    dispatch(fetchUser())
    // autologout()
    // logoutNow()
   
    // console.log(autoLogoutTime)
  }
},[user])
  return (
    <header className="header">
      <div className="logo">
        <Link to='/'><h3>National ******* Registry</h3></Link>
      </div>
      <ul>
      {user ? (
          <li>
            <button className='btn-logout' onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
        ) : (<></>)}
        
      </ul>
    </header>
  )
}

export default Header