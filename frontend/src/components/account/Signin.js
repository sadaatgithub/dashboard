import { useState, useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'
import { FaUser } from "react-icons/fa";
import { login, reset } from "../../features/auth/authSlice";


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
            <button type="submit" className="btn-login">{isLoading? 'Requesting' : 'Login'}</button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Signin;
