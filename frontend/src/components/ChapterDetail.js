import React ,{useEffect, useState} from 'react'
import { useDispatch , useSelector} from 'react-redux'
import { fetchUser, reset as resetUser } from '../features/user/userSlice';
import ChapterEdit from './pwhData/ChapterEdit';

const ChapterDetail = () => {
  // const {userDetail} = props
const {userDetail, isSuccess} = useSelector((state) => state.fetchUser)

const [visible, setVisible] = useState(false)

  const dispatch = useDispatch()
const onClick = () =>{
    setVisible(!visible)
}
useEffect (() =>{
 

},[isSuccess])

  return (
    <>  
    <div className="chapter-details-heading"><p>Chapter Details</p></div>
     { isSuccess? (
     <>
     <div className="chapter-name">
     <p>Chapter Name : -</p><p>{userDetail?.first_name + "  " + userDetail?.last_name}</p>
     </div>
        <div className="chapter-address">
        <p>Address : -</p>
        <div className="address-detail">
        <p className='text-sm'> {userDetail?.chapter_address?.line_1 +"," + userDetail.chapter_address?.line_2 + "," + userDetail.chapter_address?.line_3}</p> 
        <p className='text-sm'> <strong>City :- </strong>{userDetail.chapter_address?.city}</p>
        <p className='text-sm'><strong>Tah :- </strong>{userDetail.chapter_address?.tahsil} , <strong> Dist :- </strong>{userDetail.chapter_address?.district}</p>
        <p className='text-sm'><strong>State :- </strong>{userDetail.chapter_address?.state + "," + " " + userDetail.chapter_address?.pincode}</p>
        </div>
        </div>
        <a className='text-sm chapter-edit-link' onClick={onClick}>Edit</a>
       {visible? (<ChapterEdit onClick={onClick}/>):('')} 
    </>) :(<>No data</>)}
    <h5>Key Person:</h5>
    <h5>co-ordinator</h5>
    </>
  )
}

export default ChapterDetail