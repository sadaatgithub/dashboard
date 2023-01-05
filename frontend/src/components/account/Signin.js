import { useState, useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'
import { FaUser,FaLock ,FaEye,FaEyeSlash} from "react-icons/fa";
import { login, reset } from "../../features/auth/authSlice";
import {ImSpinner8} from "react-icons/im"


const Signin = () => {
  
  const { user, isLoading, isError, message } = useSelector((state) => state.auth)
  const [showPswrd,setShowPswrd] = useState(false)

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
     
      <div className="w-full md:w-3/4 flex flex-col items-center py-12 sm:py-20 bg-white rounded-lg shadow-md">

      <FaUser className="text-blue-700" size={30}/>
        <h1 className="text-2xl font-medium text-sky-700 mt-2">Login</h1>
        <form onSubmit={onSubmit} className="flex flex-col gap-2 mt-10 w-2/3 lg:w-2/5">
          <div className="flex flex-col gap-2">
            <label forhtml="username" className="text-sm text-gray-600">Username</label>
            <div className="flex justify-center items-center border rounded-sm">
              <FaUser className="text-4xl text-gray-500 bg-gray-100 p-2 "/>
          <input
            type="text"
            className="w-full pl-4 rounded-sm focus:border-indigo-700 outline-none text-gray-600 text-sm"
            id="username"
            name="username"
            value={username}
            // placeholder="Enter Username"
            onChange={onChange}
            required
          /></div>

          </div>
          <div className="flex flex-col gap-2 mt-4">
          <label forhtml="password" className="text-sm text-gray-600">Password</label>
          <div className="flex justify-center items-center border rounded-sm">
          <FaLock className="text-4xl text-gray-500 bg-gray-100 p-2 "/>
          <input
            type={showPswrd? "text":"password"}
            className="w-full pl-4 rounded-sm focus:border-indigo-700 outline-none text-gray-600 text-sm"
            id="password"
            name="password"
            value={password}
            // placeholder="Enter Password"
            onChange={onChange}
            required
          />
          {/*  */}
          {showPswrd? <FaEyeSlash className="text-4xl text-gray-800 p-2 cursor-pointer" onClick={()=>{setShowPswrd(false)}}/>
          :<FaEye className="text-4xl text-gray-800 p-2 cursor-pointer" onClick={()=>{setShowPswrd(true)}}/>}
          
          </div>
          </div>
          <button type="submit" className="flex justify-center bg-blue-700 mt-12 text-white p-2 rounded-sm hover:bg-blue-600 transition-all h-[40px]">{isLoading? <ImSpinner8  className="animate-spin self-center"/> : 'Login'}</button>
        </form>
      </div>
      </section>

    </>
  );
};

export default Signin;
