import React from 'react'
import { Link } from 'react-router-dom'
import {FaUsers,FaAddressBook,FaSearch,FaDownload,FaHospital,FaPhone, FaPlusCircle,FaHome} from 'react-icons/fa'



const DashboardNav = () => {
  return (
    <>
   
    <ul className="flex-grow mt-10 flex flex-col text-base text-gray-100 font-normal gap-y-2
     [&>*]:p-2 [&>*]:pl-4 [&>*]:ml-4 [&>*:hover]:bg-white [&>*:hover]:text-black [&>*]:rounded-l-full 
     [&>*]:transition-all duration-500 ease-in pt-8">
        <li className="flex items-center gap-x-4 rounded-l-full bg-white text-gray-800"><FaHome/>Dashboard</li>
        <Link to="/pwh-data"><li className="flex items-center gap-x-4"><FaUsers size="15" className=""/>View Pwh</li></Link>
        <Link to="/add"><li className="flex items-center gap-x-4"><FaPlusCircle  size="15" className=""/>Add PwH</li></Link>
        <li className="flex items-center gap-x-4"><FaAddressBook  size="15" className=""/>Report</li>
        <Link to="/download-data"><li className="flex items-center gap-x-4"><FaDownload  size="15" className=""/>Download</li></Link>
        <Link to="/search"> <li className="flex items-center gap-x-4"><FaSearch  size="15" className=""/>Search</li></Link>
        <li className="flex items-center gap-x-4"><FaHospital  size="15" className=""/>HTC Center</li>
        <li className="flex items-center gap-x-4"><FaPhone  size="15" className="" />Contact Us</li>
        

    </ul>
</>
  )
}

export default DashboardNav