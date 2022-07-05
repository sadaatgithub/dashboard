import axiosInstance from "../../api/Axios";

const baseURL = "http://127.0.0.1:8000/api/";


// getting which one to update fetching with id
const getPwhWithId  = async(id) =>{
  const config = {
    headers: {
      Authorization: localStorage.getItem('user')
        ? 'JWT ' + localStorage.getItem('user')
        : null,
      'Content-Type': 'application/json',
      accept: 'application/json',
    }, 
  }
  const response = await axiosInstance.get(baseURL + id + "/", config);
  // console.log(response.data);
  return response.data;
}


// updateing record with respect to id
const updatePwh  = async(data) =>{
  const config = {
    headers: {
      Authorization: localStorage.getItem('user')
        ? 'JWT ' + localStorage.getItem('user')
        : null,
      'Content-Type': 'application/json',
      accept: 'application/json',
    }, 
  }
  const response = await axiosInstance.put(baseURL + data.id + "/" ,data,config);
  // console.log(response.data);
  return response.data;
}

const updateService = {
  getPwhWithId,
  updatePwh
}
export default updateService