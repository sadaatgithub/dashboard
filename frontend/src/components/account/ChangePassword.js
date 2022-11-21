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
    <div className="close-div">
      <button className="bg-gray-600 text-white py-1 px-2 rounded mt-2"  onClick={() => navigate(-1)}>Back</button>
      </div>
    <form className="self-center m-auto flex flex-col gap-y-3 [&>div>label]:text-gray-700 [&>div>label]:mb-1 w-1/2 md:w-1/3 bg-white p-14 rounded-lg shadow-lg" onSubmit={onSubmit}>
      <div className="flex flex-col gap-y-1">
      <label htmlFor="current_password">Enter Your Current Password</label>
      <input type="password" className="border py-2 px-2 focus:border-indigo-600 rounded-sm outline-none" id="current_password" name="current_password"
   onChange={onChange} value={current_password} required
      />
</div>
      <div className="flex flex-col gap-y-1">
      <label htmlFor="new_password">Enter New Password</label>
      <input type="password" id="new_password" name="new_password" className="border py-2 px-2 outline-none focus:border-indigo-600 rounded-sm"
      onChange={onChange} value={new_password} required
      
      />
</div>
<div className="flex justify-center">
            <button type="submit" className="bg-blue-600 py-2 px-3 text-white w-full mt-5 rounded-sm hover:bg-blue-700 transition-all">{isLoading? "Requesting...":"Change Password"}</button>
          </div>
    </form>
    </>
  )
}

export default ChangePassword