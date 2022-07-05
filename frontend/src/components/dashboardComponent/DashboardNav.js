import React from 'react'
import { Link } from 'react-router-dom'
import {FaUsers,FaAddressBook,FaSearch,FaDownload,FaHospital,FaPhone, FaPlusCircle} from 'react-icons/fa'



const DashboardNav = () => {
  return (
    <><div className="flex">
    <h4 className='m-auto'>Dashboard</h4>
    </div>
    <ul className='action-div-middle'>
    <Link to="/pwh-data"><li><FaUsers color="blue" size="15" />View Pwh</li></Link>
    <Link to="/add"><li><FaPlusCircle color="blue" size="15" />Add PwH</li></Link>
    <li><FaAddressBook color="blue" size="15" />Report</li>
    <Link to="/download-data"><li><FaDownload color="blue" size="15" />Download</li></Link>
   <Link to="/search"> <li><FaSearch color="blue" size="15"/>Search</li></Link>
    <li><FaHospital color="blue" size="15" />HTC Center</li>
    <li><FaPhone color="blue" size="15" />Contact Us</li>
    
    </ul>
</>
  )
}

export default DashboardNav