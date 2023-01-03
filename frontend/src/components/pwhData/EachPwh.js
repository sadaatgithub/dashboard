import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DeleteModal from "../modal/DeleteModal";
import { uploadImage, reset as imageReset } from "../../features/data/uploadImageSlice";
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

// const {id,image} = postImage
const dispatch = useDispatch()
// const navigate = useNavigate()

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

    // setVisible(false)
  
},[isSuccess,dispatch])

// const onEdit = (e) =>{
//   const id = e.target.value;
//   dispatch(updateData(id))

// }
  
  return (
    <div className="flex flex-col  flex-grow h-full">
      <div className="flex flex-col gap-y-2">
      <div className="flex flex-col justify-center items-center">
          {/* {isLoading? 'uploading':''} */}
        {data.pwh_images[0]?.image? (<><img src={`http://127.0.0.1:8000${data.pwh_images[0]?.image}`} alt="img" className="w-[100px] h-[100px] rounded-full object-cover" /></>):(<> <FaUser size={100}/></>)}
            
        
          <form onSubmit={onSubmit} className="">
            {data.pwh_images[0]?.image? (<>

                  <input type="file" alt="" name="image" className="hidden"
                  id="image" accept="image/png, image/jpeg"
                  onChange={onChange}/>
                  <label htmlFor="image">Change Photo</label>
                  {postImage.image? (<><input type="submit" value="Change Photo" htmlFor="image" /></>):(<></>)}
                  

                  </>):(<>
                     
                  <input type="file" src="" alt="upload" name="image-upload" className="hidden"
                  id="image-upload" accept="image/png, image/jpeg"
                  onChange={onChange}/>
                    <label htmlFor="image-upload">Upload Photo</label>
                    {postImage.image? (<><input type="submit" value="Upload Photo" className="text-blue-600" /></>):(<></>)}


                  </>)}
          
          
          </form>
        </div>
        <div className="flex flex-col gap-2 [&>*]:flex [&>*]:gap-2 [&>*]:pl-2 [&>div>h5]:font-semibold [&>div>h5]:text-gray-800 [&>div]:text-sm [&>div>div:nth-child(2)]:text-sm">
           <div className="">
            <h5>Name :</h5>
            <p>{data.first_name + " " + data.last_name}</p>
          </div>
          <div className="">
            <h5>Guardian/Father Name :</h5>
            <p>{data.guardian_father_name + " " + data.last_name}</p>
          </div>
          <div className="">
            <h5>D.O.B:</h5>
            <p>{data.dob}</p>

           </div>
          
          <div className="">
            <h5>Clinical:</h5>
            <p>Factor {data.pwh_medical?.factor_def + " , " + data.pwh_medical?.factor_level + " , " + data.pwh_medical?.blood_group_with_rh} ve</p>

           </div>
           
          <div className="">
            <h5>Age:</h5>
            <p>{data.current_age} Yr</p>

           </div>
          
          <div className="flex">
            <h5 className="min-w-fit">Address :</h5>
            <div className="[&>p]:text-xs">
            <p>{data.pwh_address?.line_1 + "," +data.pwh_address?.line_2  + "," +data.pwh_address?.line_2}</p>
            
            <p>{data.pwh_address?.line_3 + "," +data.pwh_address?.city}</p>
            <p>{data.pwh_address?.tahsil + "," +data.pwh_address?.district}</p>
            <p>{data.pwh_address?.state + "," +data.pwh_address?.pincode}</p>

           </div>
           </div>
          
           <div className="">
            <h5>Contact :</h5>
            <p>{data.contact?.mobile}</p>

           </div>
         
           <div className="">
            <h5>Email :</h5>
            <p>{data.contact?.email}</p>

          
          </div>
           <div className="">
            <h5>Chapter Membership :</h5>
            <p>ABC12345678</p>

          
          </div>
        
         
      
        </div>
        
      </div>
      <div className="flex mt-3">
        <ul className="flex justify-between [&>*]:rounded-sm w-full [&>*]:cursor-pointer [&>*]:bg-blue-600 [&>*]:text-white [&>*]:w-full gap-1 [&>*]:text-center [&>*]:p-1">
       <Link to={"/edit/" + data.id}><li>Edit</li></Link>
          <li onClick={onManage} className="relative">Manage</li>

          <li>Attach</li>
          <li>Download</li>
          <li onClick={onClick}>Delete</li>
        </ul>
    
    {manageModal? (<ManageModal showModal={onClick}  hideModal={hideModal} id={data.id} />) :(null)}
          
      </div>
      
      {modal? (<DeleteModal showModal={onClick} hideModal={hideModal} id={data.id} setVisible={setVisible} />) :(null)}
      
    </div>
  );
};

export default EachPwh;
