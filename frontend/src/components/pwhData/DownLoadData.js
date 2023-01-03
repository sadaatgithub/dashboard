import React, { useEffect, useState,useRef } from 'react'
import { DownloadTableExcel } from 'react-export-table-to-excel';
// import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Spinner from '../Spinner';

const DownLoadData = () => {

  const tableRef = useRef(null);

const navigate = useNavigate()
const {data,isLoading} = useSelector((state) => state.data)

const factorList = [...new Set(data.map((item) => item.pwh_medical.factor_def))]

const districtList = [...new Set(data.map((item) => item.pwh_address.district))].sort()

const [byDistrict, setByDistrict] = useState('')
const [byFactor, setByFactor] = useState('')

const excelData = data.map((data) => data).filter((data)=> data?.pwh_address?.district?.includes(byDistrict)).filter((data) => data?.pwh_medical?.factor_def?.includes(byFactor))
// const dispatch = useDispatch()

// const notFctor = data.filter((data) => data.pwh_medical.factor_level === null)
const distList = districtList.map((district,index) =>{
  if(district){
  return (<option key={index} value={district}>{district}</option> )}
})
  useEffect(() =>{
  //  console.log(notFctor.length);
  },[excelData])

if(isLoading){
  return <Spinner />
}
 
  return (
    <>
    <main className="bg-white">
    <div className="close-div">
      <button className="bg-gray-600 text-white py-1 px-2 rounded mt-2"  onClick={() => navigate(-1)}>Back</button>
    </div>
      <div className="flex gap-x-8 py-1 bg-gray-600 mt-2">
       <div className="ml-auto flex gap-x-4 justify-center items-center">
      <label htmlFor="report-factorwise" className="text-white text-sm">Select Factor</label>
      <select name="" id="report-factorwise" className="border  rounded-sm text-sm"  onChange={(e)=>{setByFactor(e.target.value)}}>
        <option value="">All</option>
        
        {factorList.map((item,index) =>{
          if(item){
          return (<option key={index} value={item}>Factor {item}</option>)}
        })}
      </select>
      </div>
       <div className="flex gap-x-4 justify-center items-center">
      <label htmlFor="report-districtwise" className="text-white text-sm">Select District</label>
      <select name="" id="report-districtwise" className="border rounded-sm text-sm" onChange={(e)=>{setByDistrict(e.target.value)}}>

        <option value="" >All</option>
        {distList}
      </select>
      </div>

      <DownloadTableExcel filename="PwH Data" sheet="users"
                    currentTableRef={tableRef.current}>
                   <button className="mr-2 bg-white text-blue-700 py-1 px-2 rounded-sm text-sm">Export to Excel</button>
      </DownloadTableExcel>

      </div>
    <div className="max-h-screen overflow-auto">
      <table className="text-xs w-full" id='table-to-xls' ref={tableRef}>

     
        <thead>
          <tr className="bg-gray-500 text-white font-thin [&>*]:p-1">
            <td>S.No</td>
            <td>First Name</td>
            <td>Father Name</td>
            <td>Last Name</td>
            <td>D.O.B</td>
            <td>Gender</td>
            <td>Religion</td>
            <td>Caste</td>
            <td>Address</td>
            <td>Mobile</td>
            <td>Email</td>
            <td>Factor</td>
            <td>Factor Level</td>
            <td>Blood Group</td>
            <td>Other</td>
            <td>Deformity</td>
            <td>HCV</td>
            <td>HIV</td>
            <td>INHIBITOR</td>
          </tr>
        </thead>
        <tbody className="[&>*:nth-child(even)]:bg-gray-100 ">
         {excelData?.map((data,index) =>{
          return (
          <tr key={index} className="[&>*:nth-child(1)]:text-center [&>*:nth-child(6)]:text-center [&>*]:p-1 [&>*]:border-r">
              <td className="border-r">{index + 1}</td>
              <td>{data.first_name}</td>
              <td>{data.guardian_father_name? data.guardian_father_name:'---'}</td>
              <td>{data.last_name}</td>
              <td>{data.dob}</td>
              <td>{data.gender}</td>
              <td>{data.religion}</td>
              <td>{data.caste}</td>
              <td>{data.pwh_address.line_1 + " " + data.pwh_address.line_2}</td>
              <td>{data.contact.mobile}</td>
              <td>{data.contact.email}</td>
              <td>{data.pwh_medical.factor_def}</td>
              <td>{data.pwh_medical.factor_level}</td>
              <td>{data.pwh_medical.blood_group_with_rh}</td>
              <td>{data.pwh_medical.others_def}</td>
              <td>{data.pwh_medical.is_deformity? "Yes":"No"}</td>
              <td>{data.pwh_medical.is_hcv_pos? "Yes":"No"}</td>
              <td>{data.pwh_medical.is_hiv_pos?"Yes":"No"}</td>
              <td>{data.pwh_medical.is_inhibitor_pos?"Yes":"No"}</td>
           
          </tr>
          ) 
         })}
        </tbody>
      </table>
      </div>
      </main>
    </>
  )
}

export default DownLoadData