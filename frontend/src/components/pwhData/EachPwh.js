import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import updateSlice from "../../features/data/getPwhSlice";
// import { updateData, reset } from "../../features/data/getPwhSlice";
import { getPwhWithId , reset} from "../../features/data/addNewPwhSlice";
// import { getPwhWithId } from "../../features/data/getPwhSlice";
import { deletePwh } from "../../features/data/deleteSlice";
import DeleteModal from "../modal/DeleteModal";
import { uploadImage, reset as imageReset } from "../../features/data/uploadImageSlice";
import { fetchData } from "../../features/data/dataSlice";
import { toast } from "react-toastify";
import {FaUser} from 'react-icons/fa'
import ManageModal from "../modal/ManageModal";



const EachPwh = (props) => {
  const {data} =props
const data_id = data.id

const [postImage,setPostImage] = useState({
  id:null,
  image:null,
})

const {id,image} = postImage
const dispatch = useDispatch()
const navigate = useNavigate()
const {isDataFetched } = useSelector((state) =>state.createPwh)

// const {isSuccess, isLoading, isError} = useSelector((state) =>state.deletePwh)
const {isSuccess,isError,isLoading} = useSelector((state) => state.uploadImage)
const [modal,setModal] = useState(false)
const [manageModal, setManageModal] = useState(false)
const onClick = () =>{
  setModal(true)
}

const hideModal = () =>{
  setModal(false)
  setManageModal(false)
}
const onDelete = (e) =>{
  dispatch(deletePwh(e.target.value))
  console.log(e.target.value);
}
const fetchDataToUpdate = () =>{
  dispatch(getPwhWithId(data.id))
}
const onSubmit = (e) =>{
  e.preventDefault();

  dispatch(uploadImage(postImage))
  console.log(postImage)
  

}
const onChange = (e) =>{
  setPostImage((prevState) =>({
    ...prevState,
    id:data_id,
    image:e.target.files[0],
  }))
  // setImage(e.target.files[0])
  console.log(postImage);



}

const onManage = () =>{
setManageModal(!manageModal)
}
useEffect(() =>{
  if(isDataFetched){
    navigate('/edit')
  }
  if(isSuccess){
    dispatch(imageReset())
    window.location.reload()
    toast.success('Uploaded Successfully')
  }
},[isDataFetched,isSuccess])

// const onEdit = (e) =>{
//   const id = e.target.value;
//   dispatch(updateData(id))

// }
  
  return (
    <div className="each-pwh">
      <div className="pwh-div">
        <div className="pwh-info">
          <p><strong>Name :</strong> {data.first_name}</p>
          <p> <strong>Middle Name :</strong> {data.guardian_father_name}</p>
          <p>Last Name: {data.last_name}</p>
          <p>DOB: {data.dob}</p>
          <p>Clinical : <strong>Factor</strong> {data.pwh_medical?.factor_def} <b>Blood Group</b> {data.pwh_medical?.blood_group_with_rh}</p>
          <p>Address : {data.pwh_address?.line_1} ,<span>{data.pwh_address?.line_2}</span></p>
          <p>Contact No : {data.contact?.mobile}</p>
          <p>Email : {data.contact?.email}</p>
        </div>
        <div className="pwh-info-pro-pic">
          {/* {isLoading? 'uploading':''} */}
        {data.pwh_images[0]?.image? (<><img src={`http://127.0.0.1:8000${data.pwh_images[0]?.image}`} alt="img" height="auto" /></>):(<> <FaUser size={100}/></>)}
            
        
          <form onSubmit={onSubmit} >
            {data.pwh_images[0]?.image? (<>

                  <input type="file" alt="" name="image" className="change-foto"
                  id="image" accept="image/png, image/jpeg"
                  onChange={onChange}/>
                  <label htmlFor="image">Change Photo</label>
                  {postImage.image? (<><input type="submit" value="Change Photo" htmlFor="image" /></>):(<><input type="submit" value="Change Photo" htmlFor="image" /></>)}
                  

                  </>):(<>
                     
                  <input type="file" src="" alt="upload" name="image-upload" className="upload-foto"
                  id="image-upload" accept="image/png, image/jpeg"
                  onChange={onChange}/>
                    <label htmlFor="image-upload">Upload Photo</label>
                    {postImage.image? (<><input type="submit" value="Upload Photo" /></>):(<></>)}


                  </>)}
          
          
          </form>
        </div>
      </div>
      <div className="pwh-action">
        {/* <Link to={`/edit/${data.id}`}> */}
        <button value={data.id} onClick={fetchDataToUpdate}>Edit</button>
        {/* </Link> */}
        {/* <Link to="/add/">
        <button>Add Pwh</button>
        </Link> */}
      
        <button onClick={onClick}>Delete</button>
    
        <button onClick={onManage} className="btn-manage">Manage
        </button>
        {manageModal? (<ManageModal showModal={onClick}  hideModal={hideModal} id={data.id} />) :(null)}
        <button>Attach</button>
        <button>Download</button>
      </div>
      
      {modal? (<DeleteModal showModal={onClick} hideModal={hideModal} id={data.id} />) :(null)}
      
    </div>
  );
};

export default EachPwh;
