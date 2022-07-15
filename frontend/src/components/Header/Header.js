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