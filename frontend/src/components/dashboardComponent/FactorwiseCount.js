import React from 'react'
import { useSelector } from 'react-redux'

const FactorwiseCount = () => {
  const {data} = useSelector((state) => state.data)
  
  const isFactor9 = data.map((data) => data.pwh_medical?.factor_def).includes("9")
  const isFactor8 = data.map((data) => data.pwh_medical?.factor_def).includes("8")
  const isVwD = data.map((data) => data.pwh_medical?.others_def).includes("VwD")
  const isDeceased = data.map((data) => data.tag).includes("Deceased")

  return (
    <div className="flex flex-col justify-center items-center py-4 gap-y-6 bg-white sm:col-span-2 shadow-md rounded-md">
    <h3 className="text-2xl font-semibold text-gray-600">PWH count Factor wise</h3>
      <ul className="flex w-full justify-around text-gray-700">
        <li>FVIII <span className="ml-2 p-1 bg-blue-100">{isFactor8? data.filter((data) =>data.pwh_medical?.factor_def === "8").length : "0"}</span>
        </li>
        <li>FIX <span className="ml-2 px-3 py-1 rounded-sm bg-blue-100"> {isFactor9?  data.filter((data) =>data.pwh_medical?.factor_def === "9").length : "0"}</span></li>
        <li>VwD <span className="ml-2 px-3 py-1 rounded-sm bg-blue-100"> {isVwD?  data.filter((data) =>data.pwh_medical?.others_def === "VwD").length : "0"}</span></li>
        <li>Other <span className="ml-2 px-3 py-1 rounded-sm bg-blue-100"> {isFactor9?  data.filter((data) =>data.pwh_medical?.factor_def === "").length : "0"}</span></li> 
        <li>Deceased <span className="ml-2 px-3 py-1 rounded-sm bg-blue-100"> {isDeceased? data.filter((data) =>data.tag === "Deceased").length : "0"}</span></li> 
      </ul>
     
  </div>
  )
}

export default FactorwiseCount