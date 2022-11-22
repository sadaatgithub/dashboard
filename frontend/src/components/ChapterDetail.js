import React ,{ useState} from 'react'
import {  useSelector} from 'react-redux'
import ChapterEdit from './pwhData/ChapterEdit';

const ChapterDetail = () => {
  // const {userDetail} = props
const {userDetail, isSuccess} = useSelector((state) => state.fetchUser)

const [chapterEditModal, setChapterEditModal] = useState(false)


const onClick = () =>{
    setChapterEditModal(!chapterEditModal)
}


  return (
    <>  
     { isSuccess? (
     <>
     <div className="text-gray-600 px-4 flex flex-col gap-y-2">
     <div className="flex gap-x-3 mt-2">
     <p className="font-semibold text-gray-800 text-sm">Chapter Name : -</p><p>{userDetail?.first_name + "  " + userDetail?.last_name} lorem ipsum</p>
     </div>
     <div className="flex gap-x-2">
          <div className="font-semibold text-gray-800 text-sm"><p>Address : -</p></div>
        
        <div className="">
        <p className="text-sm"> {userDetail?.chapter_address?.line_1 + "," + userDetail.chapter_address?.line_2 + "," + userDetail.chapter_address?.line_3}</p> 
        <p className='text-sm'> <span>City :- </span>{userDetail.chapter_address?.city}</p>
        <p className='text-sm'><span>Tah :- </span>{userDetail.chapter_address?.tahsil} , <span> Dist :- </span>{userDetail.chapter_address?.district}</p>
        <p className='text-sm'><span>State :- </span>{userDetail.chapter_address?.state + "," + " " + userDetail.chapter_address?.pincode}</p>
        </div>
        </div>
        <button className="text-sm underline  self-end text-blue-600" onClick={onClick}>Edit</button>
       {chapterEditModal? (<ChapterEdit onClick={onClick} state={chapterEditModal}/>):(null)} 
       </div></>) :(<>No data</>)}
       <div className="p-1 pl-4">
    <h5>Key Person:</h5>
    <p><small>Lorem ipsum dolor sit amet.</small></p>
    <h5>co-ordinator</h5>
    <p><small>Lorem ipsum dolor sit amet.</small></p>
    </div>
    
    </>
  )
}

export default ChapterDetail