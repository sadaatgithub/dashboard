import { useState, useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'
import { FaUser } from "react-icons/fa";
import { login, reset } from "../../features/auth/authSlice";
import Spinner from '../Spinner'
import { fetchUser } from "../../features/user/userSlice";
import { fetchData } from "../../features/data/dataSlice";

const Signin = () => {
  
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
const { user, isLoading, isError, isSuccess, message } = useSelector(
  (state) => state.auth
)
const {isDataFetched} = useSelector((state) => state.data)
useEffect(() =>{
    if(isError){
      toast.error(message)
    }
   
    if (isSuccess){
       toast.success("You are logged in")
      //  dispatch(fetchUser())
      //  dispatch(fetchData())
       navigate('/')
  }
    // dispatch(reset())
},[user, isSuccess,message,navigate,dispatch,isDataFetched])


const onSubmit = (e) =>{
  e.preventDefault()
  const user = {
    username,password,
  }
  dispatch(login(user))
  // console.log(user);
  // console.log(formData);
}

if(isLoading){
  return <Spinner/>
}
  return (
    <>
      <section className="login-div">
      <FaUser size={30}/>
        <h1>Login</h1>
        {/* <p>Please Login</p> */}
      </section>
      <section className="form login-form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={username}
            placeholder="Enter Username"
            onChange={onChange }
          />
          </div>
          <div className="form-group">
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={password}
            placeholder="Enter Password"
            onChange={onChange}
          />
          </div>
          <div className="form-group">
            <button type="submit" className="btn-login">Login</button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Signin;
