import axiosInstance from "../../api/Axios";

const baseURL = "http://127.0.0.1:8000/api/";
const authURL = "http://127.0.0.1:8000/"

// fetching data for that user
  const config = {
    headers: {
      Authorization: localStorage.getItem('user')
        ? 'JWT ' + localStorage.getItem('user')
        : null,
      'Content-Type': 'application/json',
      accept: 'application/json',
    }, 
  }

const fetchData  = async() =>{
  const config = {
    headers: {
      Authorization: localStorage.getItem('user')
        ? 'JWT ' + localStorage.getItem('user')
        : null,
      'Content-Type': 'application/json',
      accept: 'application/json',
    }, 
  }

  const response = await axiosInstance.get(baseURL,config);
  // console.log(response.data);
  return response.data;
}
const sendData  = async(data) =>{
  const config = {
    headers: {
      Authorization: localStorage.getItem('user')
        ? 'JWT ' + localStorage.getItem('user')
        : null,
      'Content-Type': 'application/json',
      accept: 'application/json',
    }, 
  }
 
  const response = await axiosInstance.post(baseURL,data,config);
  // console.log(response.data);
  return response.data;
}
const deletePwh  = async(id) =>{

  const response = await axiosInstance.delete(baseURL + id);
  return response.data;
}
const fetchUser  = async() =>{
  const config = {
    headers: {
      Authorization: localStorage.getItem('user')
        ? 'JWT ' + localStorage.getItem('user')
        : null,
      'Content-Type': 'application/json',
      accept: 'application/json',
    }, 
  }
  const response = await axiosInstance.get(authURL + "auth/users/me",config);
  if(response.data){
    localStorage.setItem('user_detail',JSON.stringify(response.data))
  }
  return response.data;
}
const changePassword  = async(data) =>{
  const config = {
    headers: {
      Authorization: localStorage.getItem('user')
        ? 'JWT ' + localStorage.getItem('user')
        : null,
      'Content-Type': 'application/json',
      accept: 'application/json',
    }, 
  }
  const response = await axiosInstance.post(authURL + "auth/users/set_password/",data,config);
  // console.log(response.data);
  return response.data;
}

const userUpdate  = async(data) =>{
  const config = {
    headers: {
      Authorization: localStorage.getItem('user')
        ? 'JWT ' + localStorage.getItem('user')
        : null,
      'Content-Type': 'application/json',
      accept: 'application/json',
    }, 
  }
  const response = await axiosInstance.put(authURL + "auth/users/me/",data,config);
  // console.log(response.data);
  return response.data;
}
const updateTag = async(data) =>{
  const {id, tag} = data
  // console.log(tag);
  const response = await axiosInstance.post(baseURL + id+'/patient_tags/',{tag:tag},config)
  return response.data
}

const uploadImage = async(postImage) =>{
const configImg = {
    headers: {
      Authorization: localStorage.getItem('user')
        ? 'JWT ' + localStorage.getItem('user')
        : null,
      'content-type': 'multipart/form-data',
      
      accept: 'application/json',
    }, 
  }

  const {id, image} = postImage
  let formData = new FormData();
  formData.append('image', image)
  const response = await axiosInstance.post(baseURL + id +"/patient_image/", formData, configImg)
  return response.data
}

const dataService = {
  fetchData,
  sendData,
  deletePwh,
  fetchUser,
  changePassword,
  userUpdate,
  uploadImage,
  updateTag,
 
}

export default dataService;