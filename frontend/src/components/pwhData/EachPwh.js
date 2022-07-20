import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import updateSlice from "../../features/data/getPwhSlice";
// import { updateData, reset } from "../../features/data/getPwhSlice";
// import { getPwhWithId , reset} from "../../features/data/addNewPwhSlice";
// import { getPwhWithId } from "../../features/data/getPwhSlice";
import { deletePwh } from "../../features/data/deleteSlice";
import DeleteModal from "../modal/DeleteModal";
import { uploadImage, reset as imageReset } from "../../features/data/uploadImageSlice";
import { fetchData } from "../../features/data/dataSlice";
import { toast } from "react-toastify";
import {FaUser} from 'react-icons/fa'
import ManageModal from "../modal/ManageModal";



const EachPwh = (props) => {

  const {data,setVisible} =props
const data_id = data.id

const [postImage,setPostImage] = useState({
  id:null,
  image:null,
})

const {id,image} = postImage
const dispatch = useDispatch()
const navigate = useNavigate()

// const {data} = useSelector((state) =>state.data)
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
// const onDelete = (e) =>{
//   dispatch(deletePwh(e.target.value))
//   console.log(e.target.value);
// }

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
 
  if(isSuccess){
    dispatch(imageReset())
    toast.success('Uploaded Successfully')
    window.location.reload()
  }
},[isSuccess,dispatch])

// const onEdit = (e) =>{
//   const id = e.target.value;
//   dispatch(updateData(id))

// }
  
  return (
    <div className="each-pwh">
      <div className="pwh-div">
        <div className="pwh-info">
          <div className="pwh-info-div">
           <div className="pwh-info-label">
            <h5>Name :</h5>
           </div>
           <div className="pwh-info-value">
            <p>{data.first_name + " " + data.last_name}</p>
           </div>
          </div>
          <div className="pwh-info-div">
          <div className="pwh-info-label">
            <h5>Guardian/Father Name :</h5>
           </div>
           <div className="pwh-info-value">
            <p>{data.guardian_father_name + " " + data.last_name}</p>
           </div>
          </div>
          <div className="pwh-info-div">
          <div className="pwh-info-label">
            <h5>D.O.B:</h5>
           </div>
           <div className="pwh-info-value">
            <p>{data.dob}</p>
           </div>
          </div>
          <div className="pwh-info-div">
          <div className="pwh-info-label">
            <h5>Clinical:</h5>
           </div>
           <div className="pwh-info-value">
            <p>Factor {data.pwh_medical?.factor_def + " , " + data.pwh_medical?.factor_level + " , " + data.pwh_medical?.blood_group_with_rh} ve</p>
           </div>
          </div>
          <div className="pwh-info-div">
          <div className="pwh-info-label">
            <h5>Age:</h5>
           </div>
           <div className="pwh-info-value">
            <p>00</p>
           </div>
          </div>
          <div className="pwh-info-div">
          <div className="pwh-info-label">
            <h5>Address :</h5>
           </div>
           <div className="pwh-info-value">
            <p>{data.pwh_address?.line_1 + "," +data.pwh_address?.line_2  + "," +data.pwh_address?.line_2}</p>
            
            <p>{data.pwh_address?.line_3 + "," +data.pwh_address?.city}</p>
            <p>{data.pwh_address?.tahsil + "," +data.pwh_address?.district}</p>
            <p>{data.pwh_address?.state + "," +data.pwh_address?.pincode}</p>

           </div>
          </div>
          <div className="pwh-info-div">
           <div className="pwh-info-label">
            <h5>Contact :</h5>
           </div>
           <div className="pwh-info-value">
            <p>{data.contact?.mobile}</p>
           </div>
          </div>
          <div className="pwh-info-div">
           <div className="pwh-info-label">
            <h5>Email :</h5>
           </div>
           <div className="pwh-info-value">
            <p>{data.contact?.email}</p>
           </div>
          </div>
          <div className="pwh-info-div">
           <div className="pwh-info-label">
            <h5>Chapter Membership :</h5>
           </div>
           <div className="pwh-info-value">
            <p>ABC12345678</p>
           </div>
          </div>
        
         
      
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
                  {postImage.image? (<><input type="submit" value="Change Photo" htmlFor="image" /></>):(<></>)}
                  

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
        <ul className="pwh-action-link">
       <Link to={"/edit/" + data.id}><li>Edit</li></Link>
          <li onClick={onManage}>Manage</li>

          <li>Attach</li>
          <li>Download</li>
          <li onClick={onClick}>Delete</li>
        </ul>
    
    {manageModal? (<ManageModal showModal={onClick}  hideModal={hideModal} id={data.id} />) :(null)}
           {/*  <button>Attach</button>
        <button>Download</button> */}
      </div>
      
      {modal? (<DeleteModal showModal={onClick} hideModal={hideModal} id={data.id} />) :(null)}
      
    </div>
  );
};

export default EachPwh;
