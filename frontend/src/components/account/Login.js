import React,{useRef, useState} from 'react'
import axiosInstance from '../../api/Axios';

const Login = () => {

 

  const initialFormData = Object.freeze({
		username: '',
		password: '',
	});
  const [formData, updateFormData] = useState(initialFormData);

	const handleChange = (e) => {
		updateFormData({
			...formData,
			[e.target.name]: e.target.value.trim(),
		});
	};



const submitHandler = (e) =>{
  e.preventDefault()
  console.log(formData)

  axiosInstance.post(`auth/jwt/create/`,{
    username:formData.username,
    password:formData.password
  }).then((res) =>{
    localStorage.setItem('access_token', res.data.access);
				localStorage.setItem('refresh_token', res.data.refresh);
				axiosInstance.defaults.headers['Authorization'] =
					'JWT ' + localStorage.getItem('access_token');
          console.log(res.data)
  })
}

  return (
    <form className='flex-col login-div' onSubmit={submitHandler}>
      <h3>Login</h3>
      <div className='flex-col'>
      <label htmlFor="username">Username</label>
      <input type="text" name='username' onChange={handleChange} placeholder='Enter Username'/>
      </div>
      <div className="flex-col">
      <label htmlFor="password">Password</label>
      <input type="password" name='password' onChange={handleChange} placeholder='Enter Password'/>
      </div>
      <div className="btn-div">
        <button className='btn btn-submit'>Submit</button>
      </div>
    </form>
  )
}

export default Login