import React from 'react'
import { Link } from 'react-router-dom'
import {FaUsers,FaAddressBook,FaSearch,FaDownload,FaHospital,FaPhone, FaPlusCircle,FaHome} from 'react-icons/fa'
import { useSelector,useDispatch } from 'react-redux'
import { searchOpen } from '../../features/searchdiv/searchSlice'

const DashboardNav = () => {
  // const {isSearchDivOpen} = useSelector((state) => state.searchDiv)
const dispatch = useDispatch()
  return (
    <>
   
    <ul className="flex-grow mt-10 flex flex-col text-sm text-gray-100 font-normal gap-y-2
     [&>*]:p-2 [&>*]:pl-4 [&>*]:ml-4 [&>*:hover]:bg-white [&>*:hover]:text-black [&>*]:rounded-l-full 
     [&>*]:transition-all duration-500 ease-in pt-8">
        <li className="flex items-center gap-x-2 rounded-l-full bg-white text-gray-800"><FaHome/>Dashboard</li>
        <Link to="/pwh-data"><li className="flex items-center gap-x-2"><FaUsers size="15" className=""/>View Pwh</li></Link>
        <Link to="/add"><li className="flex items-center gap-x-2"><FaPlusCircle  size="15" className=""/>Add PwH</li></Link>
        <Link to="/download-data"><li className="flex items-center gap-x-2"><FaDownload  size="15" className=""/>Download</li></Link>
        <Link to="#"> <li className="flex items-center gap-x-2" onClick={()=> dispatch(searchOpen())}><FaSearch  size="15" className=""/>Search</li></Link>
        <li className="flex items-center gap-x-2"><FaAddressBook  size="15" className=""/>Report</li>
        <li className="flex items-center gap-x-2"><FaHospital  size="15" className=""/>HTC Center</li>
        <li className="flex items-center gap-x-2"><FaPhone  size="15" className="" />Contact Us</li>
        

    </ul>
</>
  )
}

export default DashboardNav