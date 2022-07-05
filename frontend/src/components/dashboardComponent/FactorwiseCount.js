import React from 'react'
import { useSelector } from 'react-redux'

const FactorwiseCount = () => {
  const {data} = useSelector((state) => state.data)
  
  const isFactor9 = data.map((data) => data.pwh_medical?.factor_def).includes("9")
  const isFactor8 = data.map((data) => data.pwh_medical?.factor_def).includes("8")
  const isVwD = data.map((data) => data.pwh_medical?.others_def).includes("VwD")
  const isDeceased = data.map((data) => data.tag).includes("Deceased")

  return (
    <div className="total-pwh-each">
    <p>PWH count Factor wise</p>
    <div className="factor-wise">
      <ul className='flex foctorwise-count'>
        <li><p>Factor VIII</p>
        {isFactor8? data.filter((data) =>data.pwh_medical?.factor_def === "8").length : "0"}
        </li>
        <li><p>Factor IX</p>{isFactor9?  data.filter((data) =>data.pwh_medical?.factor_def === "9").length : "0"} </li>
        <li><p>VwD</p>{isVwD?  data.filter((data) =>data.pwh_medical?.others_def === "VwD").length : "0"}</li>
        <li><p>Other</p>{isFactor9?  data.filter((data) =>data.pwh_medical?.factor_def === "").length : "0"}</li> 
        <li><p>Deceased</p>{isDeceased? data.filter((data) =>data.tag === "Deceased").length : "0"}</li> 
      </ul>
     
    </div>
  </div>
  )
}

export default FactorwiseCount