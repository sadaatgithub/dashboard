import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const IncompleteData = () => {
const {data} = useSelector((state) => state.data)
const [open,setOpen] = useState(false)


  return (
    <>
   
   <div className="border text-sm leading-loose text-gray-600 ">
    <div className="flex justify-between px-8">
    <p>Date of Birth</p><p>{data.filter((data) => data.dob === null).length}</p>
    </div>
    <div className="flex justify-between px-8">
    <p>Factor defeciency</p><p>{data.filter((data) => data.pwh_medical.factor_def === null).length}</p>
    </div>
    <div className="flex justify-between px-8">
    <p>Factor Assay</p><p>{data.filter((data) => data.pwh_medical.factor_level === null).length}</p>
    </div>
    <div className="flex justify-between px-8">
    <p>Blood Group</p><p>{data.filter((data) => data.pwh_medical.blood_group_with_rh  === null).length}</p>
    </div>
    <div className="flex justify-between px-8">
    <p>Father Name</p><p>{data.filter((data) => data.guardian_father_name === null).length}</p>
    </div>
    <div className="flex justify-between px-8">
    <p>Contact no</p><p>{data.filter((data) => data.contact.mobile === null).length}</p>
    </div>
    </div>
    
    </>
  )
}

export default IncompleteData