import React from 'react'
import { useSelector } from 'react-redux'

const FactorwiseCount = () => {
  const {data} = useSelector((state) => state.data)
  
  const isFactor9 = data.map((data) => data.pwh_medical?.factor_def).includes("9")
  const isFactor8 = data.map((data) => data.pwh_medical?.factor_def).includes("8")
  const isVwD = data.map((data) => data.pwh_medical?.others_def).includes("VwD")
  const isDeceased = data.map((data) => data.tag).includes("Deceased")

  return (
    <div className="flex flex-col justify-between items-center  bg-white sm:col-span-2 shadow-md rounded-md p-2">
    <h3 className="text-base lg:text-xl  font-bold text-blue-800 uppercase p-2 ">Patient count Factor wise</h3>
      <ul className="flex  w-full justify-around  [&>li]:p-2 text-gray-900 font-medium [&>li]:flex [&>li]:flex-col [&>li]:items-center">
        <li>FVIII <span className="text-slate-500">{isFactor8? data.filter((data) =>data.pwh_medical?.factor_def === "8").length : "0"}</span>
        </li>
        <li>FIX <span className="text-slate-500"> {isFactor9?  data.filter((data) =>data.pwh_medical?.factor_def === "9").length : "0"}</span></li>
        <li>VwD <span className="text-slate-500"> {isVwD?  data.filter((data) =>data.pwh_medical?.others_def === "VwD").length : "0"}</span></li>
        <li>Other <span className="text-slate-500"> {isFactor9?  data.filter((data) =>data.pwh_medical?.factor_def === "").length : "0"}</span></li> 
        <li>Deceased <span className="text-slate-500"> {isDeceased? data.filter((data) =>data.tag === "Deceased").length : "0"}</span></li> 
      </ul>
     
  </div>
  )
}

export default FactorwiseCount