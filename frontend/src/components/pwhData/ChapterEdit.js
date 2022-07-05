import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
import { userUpdate, reset } from '../../features/user/userUpdateSlice'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate} from "react-router-dom"
import { toast } from "react-toastify";
import { fetchUser } from '../../features/user/userSlice';


const ChapterEdit = (props) => {
  const {onClick} = props

  const {userDetail} = useSelector((state) => state.fetchUser)
  const {isLoading,isSuccess,isError,message} = useSelector((state) => state.userUpdate)
  const [data, setData] = useState(userDetail)
  // const data = JSON.parse(userDetail)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onChange = level => e => {
      // console.log(e.target.value);
    if(!level){
      setData({...data,[e.target.name]:e.target.value})
    } else{
      setData({
        ...data,
        [level]:{
          ...data[level],
          [e.target.name]:e.target.value
        }
      })
    }
  };
const onSubmit = (e) =>{
  e.preventDefault();
  dispatch(userUpdate(data))
  

}

  useEffect (() =>{
      if(isSuccess){
      toast.success("Address Updated Successfully")
      onClick()
      return () =>{
        dispatch(reset())
        dispatch(fetchUser())
      }
 
      }
     
      
  },[isLoading,isSuccess,isError])
  return (
    <form className='chapter-edit' onSubmit={onSubmit}>
    <button className='chapter-edit-close' onClick={onClick}>X</button>
      <div className="chapter-edit-heading">
       <strong> Edit Chapter Details</strong>
      </div>
      <div className="chapter-edit-input">
        <div className="edit-form-group">
          <label htmlFor="line_1">Line 1</label>
        <input type="text" placeholder='Line 1' name='line_1' value={data.chapter_address?.line_1} onChange={onChange('chapter_address')} />
        <label htmlFor="line_2">Line 2 </label>

        <input type="text" placeholder='Line 2' name="line_2" value={data.chapter_address?.line_2}  onChange={onChange('chapter_address')} />
        <label htmlFor="line_3">Line 3 </label>
        <input type="text" placeholder='Line 3' name='line_3' value={data.chapter_address?.line_3} onChange={onChange('chapter_address')} />
        <label htmlFor="city">City</label>
        <input type="text" placeholder='City' name="city" value={data.chapter_address?.city} onChange={onChange('chapter_address')} />
        </div>
        <div className="edit-form-group">
        
        <label htmlFor="tahsil">Tahsil </label>
        <input type="text" placeholder='Tahsil' name="tahsil" value={data.chapter_address?.tahsil} onChange={onChange('chapter_address')} />
        <label htmlFor="district">District</label>
        <input type="text"  placeholder='District' name="district" value={data.chapter_address?.district} onChange={onChange('chapter_address')} />
        <label htmlFor="state">State</label>
        <input type="text"  placeholder='State' name='state'  value={data.chapter_address?.state} onChange={onChange('chapter_address')} />
        <label htmlFor="pincode">Pincode</label>
        <input type="number"  placeholder='Pincode'  name='pincode' value={data.chapter_address?.pincode} onChange={onChange('chapter_address')} />
        </div>
      </div>
      <button className="chapter-edit-btn-submit">{isLoading?"Updating...." :  "Update"}</button>
    </form>
  )
}

export default ChapterEdit