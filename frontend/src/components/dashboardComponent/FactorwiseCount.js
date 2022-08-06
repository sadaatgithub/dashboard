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
      <ul className='foctorwise-count'>
        <li>FVIII<span>{isFactor8? data.filter((data) =>data.pwh_medical?.factor_def === "8").length : "0"}</span>
        </li>
        <li>FIX <span> {isFactor9?  data.filter((data) =>data.pwh_medical?.factor_def === "9").length : "0"}</span></li>
        <li>VwD <span> {isVwD?  data.filter((data) =>data.pwh_medical?.others_def === "VwD").length : "0"}</span></li>
        <li>Other <span> {isFactor9?  data.filter((data) =>data.pwh_medical?.factor_def === "").length : "0"}</span></li> 
        <li>Deceased <span> {isDeceased? data.filter((data) =>data.tag === "Deceased").length : "0"}</span></li> 
      </ul>
     
    </div>
  </div>
  )
}

export default FactorwiseCount