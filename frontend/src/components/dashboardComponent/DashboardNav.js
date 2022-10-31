import React from 'react'
import { Link } from 'react-router-dom'
import {FaUsers,FaAddressBook,FaSearch,FaDownload,FaHospital,FaPhone, FaPlusCircle} from 'react-icons/fa'



const DashboardNav = () => {
  return (
    <>
   
    <ul className="flex-grow mt-10 flex flex-col gap-y-4  text-base text-gray-600 font-medium ml-4 [&>*]:p-1 [&>*:hover]:bg-gray-100 [&>*]:w-3/4 [&>*]:rounded-md ">
        <Link to="/pwh-data"><li className="flex items-center gap-x-4"><FaUsers size="15" className="text-red-600"/>View Pwh</li></Link>
        <Link to="/add"><li className="flex items-center gap-x-4"><FaPlusCircle  size="15" className="text-red-600"/>Add PwH</li></Link>
        <li className="flex items-center gap-x-4"><FaAddressBook  size="15" className="text-red-600"/>Report</li>
        <Link to="/download-data"><li className="flex items-center gap-x-4"><FaDownload  size="15" className="text-red-600"/>Download</li></Link>
        <Link to="/search"> <li className="flex items-center gap-x-4"><FaSearch  size="15" className="text-red-600"/>Search</li></Link>
        <li className="flex items-center gap-x-4"><FaHospital  size="15" className="text-red-600"/>HTC Center</li>
        <li className="flex items-center gap-x-4"><FaPhone  size="15" className="text-red-600" />Contact Us</li>
        

    </ul>
</>
  )
}

export default DashboardNav