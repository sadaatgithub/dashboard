import React from 'react'
import {Bar, Pie} from "react-chartjs-2"
import {Chart as ChartJS} from "chart.js/auto"
import { useSelector } from 'react-redux'


function DataChart() {
  const { data } = useSelector((state)=>state.data)


  const f8 = data.filter((data) => data.pwh_medical?.factor_def == "8").length
  const f9 = data.filter((data) => data.pwh_medical?.factor_def == "9").length
  const vwd = data.filter((data) => data.pwh_medical?.others_def == "VwD").length
  const other = data.filter((data) => data.pwh_medical?.factor_def == "other").length

  return (
    <div className="w-1/2 md:w-2/3">
    <Pie className='pie-chart-img'
    data={{
   
      labels: [`FVIII ${f8}`, `FIX ${f9}`, `VwD ${vwd}`, `Other ${other}`],
      datasets: [
        {
          id: 1,
          label: '',
          data: [f8, f9, vwd, other],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(230, 210, 56)'
          ],
        },
        // {
        //   id: 2,
        //   label: 'Total',
        //   data: [3],
        //   backgroundColor: [
        //     'rgb(255, 99, 132)',
        //     // 'rgb(54, 162, 235)',
        //     // 'rgb(255, 205, 86)'
        //   ],
        // },
       
      ],
      
    }} />
    </div>
  )
}

export default DataChart