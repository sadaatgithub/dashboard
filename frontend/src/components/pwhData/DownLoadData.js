import React, { useEffect, useState } from 'react'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Spinner from '../Spinner';

const DownLoadData = () => {

const navigate = useNavigate()
const {data, isSuccess,isLoading} = useSelector((state) => state.data)

const factorList = [...new Set(data.map((item) => item.pwh_medical.factor_def))]

const districtList = [...new Set(data.map((item) => item.pwh_address.district))]

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
    <main className="pwh-data-to-excel">
    <div className="close-div">
      <button className='back-btn'  onClick={() => navigate(-1)}>Back</button>
      </div>
      <div className="excel-download-btn">
       <div>
      <label htmlFor="report-factorwise">Select Factor </label>
      <select name="" id="report-factorwise"  onChange={(e)=>{setByFactor(e.target.value)}}>
        <option value="">All</option>
        
        {factorList.map((item,index) =>{
          if(item){
          return (<option key={index} value={item}>Factor {item}</option>)}
        })}
      </select>
      </div>
       <div>
      <label htmlFor="report-districtwise">Select District </label>
      <select name="" id="report-districtwise" onChange={(e)=>{setByDistrict(e.target.value)}}>

        <option value="" >All</option>
        {distList}
      </select>
      </div>
      <ReactHTMLTableToExcel 
      table="table-to-xls" 
      filename="all_pwh"
      sheet="tablexls"/>

      </div>
    <div className="pwh-excel-table">
      <table className='pwh-data-table' id='table-to-xls'>

     
        <thead>
          <tr>
            <td>S.No</td>
            <td>First Name</td>
            <td>Father name</td>
            <td>Last name</td>
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
        <tbody>
         {excelData?.map((data,index) =>{
          return (
          <tr key={index}>
              <td>{index + 1}</td>
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