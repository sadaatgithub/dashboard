import React ,{ useState} from 'react'
import {  useSelector} from 'react-redux'
import ChapterEdit from './pwhData/ChapterEdit';

const ChapterDetail = () => {
  // const {userDetail} = props
const {userDetail, isSuccess} = useSelector((state) => state.fetchUser)

const [visible, setVisible] = useState(false)


const onClick = () =>{
    setVisible(!visible)
}


  return (
    <>  
     { isSuccess? (
     <>
     <div className="chapter-detail">
     <div className="chapter-name">
     <p>Chapter Name : -</p><p>{userDetail?.first_name + "  " + userDetail?.last_name} lorem ipsum</p>
     </div>
        <div className="chapter-address">
          <div className="chapter-address--title"><p>Address : -</p></div>
        
        <div className="address-detail">
        <p className='text-sm'> {userDetail?.chapter_address?.line_1 + "," + userDetail.chapter_address?.line_2 + "," + userDetail.chapter_address?.line_3}</p> 
        <p className='text-sm'> <span>City :- </span>{userDetail.chapter_address?.city}</p>
        <p className='text-sm'><span>Tah :- </span>{userDetail.chapter_address?.tahsil} , <span> Dist :- </span>{userDetail.chapter_address?.district}</p>
        <p className='text-sm'><span>State :- </span>{userDetail.chapter_address?.state + "," + " " + userDetail.chapter_address?.pincode}</p>
        </div>
        </div>
        <button className='text-sm chapter-edit-link' onClick={onClick}>Edit</button>
       {visible? (<ChapterEdit onClick={onClick}/>):('')} 
       </div></>) :(<>No data</>)}
    <h5>Key Person:</h5>
    <p><small>Lorem ipsum dolor sit amet.</small></p>
    <h5>co-ordinator</h5>
    <p><small>Lorem ipsum dolor sit amet.</small></p>
    
    </>
  )
}

export default ChapterDetail