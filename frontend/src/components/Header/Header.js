import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import { Link , useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../../features/auth/authSlice'
import { useEffect } from 'react'
import { fetchData } from '../../features/data/dataSlice'
import { fetchUser } from '../../features/user/userSlice'
import { reset as resetUser } from '../../features/user/userSlice'
import { reset as resetData } from '../../features/data/dataSlice'
import autoLogout from '../../features/auth/authService'
import authService from '../../features/auth/authService'


const Header = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user} = useSelector((state) => state.auth)

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
  const onLogout = () =>{

    dispatch(logout())
    dispatch(reset())
    dispatch(resetUser())
    dispatch(resetData())
   
    // navigate('/')
  }
  if(user){
  

  }
  
useEffect(() =>{
  let logoutNow;
 
  if(user){
    dispatch(fetchData())
    dispatch(fetchUser())
    const remainingTime = calculateRemainingTime()
    console.log(remainingTime)
    logoutNow = setTimeout(onLogout,remainingTime)
    // autoLogout()
    // logoutNow()
    if(!user){
      if(logoutNow){
        clearTimeout(logoutNow)
      }
    }
   
  }
},[user,dispatch])
  return (
    <header className="header">
      <div className="logo">
        <Link to='/'><h3>National ABC Registry</h3></Link>
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