import React, { useEffect } from 'react'
import {Chart} from "react-google-charts"
import { useSelector } from 'react-redux'





export const options = {
    title: "All PwH Data",
    is3D: true,
  };

const PieChart = () => {

    
const { data:pwhData } = useSelector((state)=>state.data)

  const f8 = pwhData.filter((data) => data.pwh_medical?.factor_def == "8").length
  const f9 = pwhData.filter((data) => data.pwh_medical?.factor_def == "9").length
  const vwd = pwhData.filter((data) => data.pwh_medical?.others_def == "VwD").length
  const other = pwhData.filter((data) => data.pwh_medical?.factor_def == "other").length
const data = [
    ["Task", "Hours per Day"],
    ["FVII", f8],
    ["FIX", f9],
    ["VwD", vwd],
    ["Other", other],
    // ["Sleep", 7],
  ];
  useEffect(()=>{
    console.log(data)
  },[data])

  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"400px"}
    />
  )
}

export default PieChart