import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { changePassword , reset} from "../../features/auth/changePwdSlice";
import {toast} from 'react-toastify'
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import { fetchData, reset as dataReset } from "../../features/data/dataSlice";
import { fetchUser, reset as userReset } from "../../features/user/userSlice";



const ChangePassword = () => {


const [formData, setFormData] = useState({
    new_password: "",
    current_password: "",
});

const {isLoading,isSuccess,isError,message} = useSelector((state) => state.changePassword)
const {current_password, new_password} = formData

const dispatch = useDispatch()
const navigate = useNavigate()

const onChange = (e) =>{
    setFormData((prevState) =>({
      ...prevState,[e.target.name] : e.target.value
    }))
}
const onSubmit = (e) => {
      e.preventDefault()
      console.log(formData);
      dispatch(changePassword(formData))
}

useEffect (() =>{
  if(isError){
    toast.error('Something went wrong...!')
  }
  if(isSuccess){
    dispatch(reset())
    dispatch(logout())
    dispatch(dataReset())
    dispatch(userReset())
    navigate('/login')
    toast.success('Password Changed Successfully...Please Login with new Password')
  }


},[isLoading,isError,isSuccess,message])
  return (
    <>
    <form className="pwd-form" onSubmit={onSubmit}>
      <div className="form-group">
      <label htmlFor="current_password">Enter Your Current Password</label>
      <input type="password" className="form-control" id="current_password" name="current_password"
      placeholder="Current Password" onChange={onChange} value={current_password} 
      />
</div>
      <div className="form-group">
      <label htmlFor="new_password">Enter New Password</label>
      <input type="password" id="new_password" name="new_password"
      placeholder="New Password" onChange={onChange} value={new_password}
      
      />
</div>
<div className="form-group">
            <button type="submit" className="btn btn-block">{isLoading? "Requesting...":"Change Password"}</button>
          </div>
    </form>
    </>
  )
}

export default ChangePassword