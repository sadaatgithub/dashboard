import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const IncompleteData = () => {
const {data} = useSelector((state) => state.data)
const [open,setOpen] = useState(false)


  return (
    <>
   
   <div class="incomplete-data">
    <div class="">
    <p>Date of Birth</p><p>{data.filter((data) => data.dob === null).length}</p>
    </div>
    <div class="">
    <p>Factor defeciency</p><p>{data.filter((data) => data.pwh_medical.factor_def === null).length}</p>
    </div>
    <div class="">
    <p>Factor Assay</p><p>{data.filter((data) => data.pwh_medical.factor_level === null).length}</p>
    </div>
    <div class="">
    <p>Blood Group</p><p>{data.filter((data) => data.pwh_medical.blood_group_with_rh  === null).length}</p>
    </div>
    <div class="">
    <p>Father Name</p><p>{data.filter((data) => data.guardian_father_name === null).length}</p>
    </div>
    <div class="">
    <p>Contact no</p><p>{data.filter((data) => data.contact.mobile === null).length}</p>
    </div>
    </div>
    
    </>
  )
}

export default IncompleteData