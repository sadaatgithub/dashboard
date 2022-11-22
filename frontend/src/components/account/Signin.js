import { useState, useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'
import { FaUser } from "react-icons/fa";
import { login, reset } from "../../features/auth/authSlice";
import {ImSpinner8} from "react-icons/im"


const Signin = () => {
  
  const { user, isLoading, isError, message } = useSelector(
    (state) => state.auth
  )
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = formData;

  const navigate = useNavigate()
  const dispatch = useDispatch()

const onChange = (e) =>{
  setFormData((prevState) =>({
    ...prevState,
    [e.target.name]: e.target.value,
  }))
}



const onSubmit = (e) =>{
  e.preventDefault()
  const user = {
    username,password,
  }
  dispatch(login(user))

}
useEffect(() =>{
    if(isError){
      toast.error(message)
      dispatch(reset())
      navigate('/login')

    }
   
    if (user){
       toast.success("You are logged in")
       navigate('/')
  }
    // dispatch(reset())
},[user,isLoading,isError,navigate,dispatch,message])




// if(isLoading){
//   return <Spinner/>
// }
  return (
    <>
      <section className="flex-grow flex justify-center items-center bg-gray-100">
     
        {/* <p>Please Login</p> */}
      <div className="w-full sm:w-2/3 flex flex-col items-center py-12 sm:py-20 bg-white rounded-lg shadow-md">
      <FaUser className="text-blue-700" size={30}/>
        <h1 className="text-2xl font-medium text-sky-700 mt-2">Login</h1>
        <form onSubmit={onSubmit} className="flex flex-col gap-2 mt-10 w-2/3 lg:w-2/5">
          <div className="flex flex-col gap-1">
            <label forhtml="username" className="text-sm text-gray-600">Username</label>
          <input
            type="text"
            className="border w-full py-1 rounded-sm focus:border-indigo-700 outline-none"
            id="username"
            name="username"
            value={username}
            // placeholder="Enter Username"
            onChange={onChange}
          />
          </div>
          <div className="flex flex-col gap-1">
          <label forhtml="password" className="text-sm text-gray-600">Password</label>

          <input
            type="password"
            className="border w-full py-1 rounded-sm focus:border-indigo-700 outline-none"
            id="password"
            name="password"
            value={password}
            // placeholder="Enter Password"
            onChange={onChange}
          />
          </div>
          <button type="submit" className="flex justify-center bg-blue-800 mt-12 text-white p-2 rounded-sm hover:bg-blue-700 transition-all">{isLoading? <ImSpinner8  className="animate-spin self-center"/> : 'Login'}</button>
        </form>
      </div>
      </section>

    </>
  );
};

export default Signin;
