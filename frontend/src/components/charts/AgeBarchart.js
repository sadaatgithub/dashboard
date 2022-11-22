import {Bar} from "react-chartjs-2"
import {Chart as ChartJS} from "chart.js/auto"
import { useSelector } from 'react-redux'
import { useEffect } from "react"

const AgeBarchart = () => {
    const { data } = useSelector((state)=>state.data)
    const ageZeroToTen = data.filter(data =>data.current_age >= 0 && data.current_age <= 10).length
    const tenToTwenty = data.filter(data => data.current_age >= 11 && data.current_age <= 20).length
    const twentyToThirty = data.filter(data => data.current_age >= 21 && data.current_age <= 30).length
    const thirtyToForty = data.filter(data => data.current_age >= 31 && data.current_age <= 40).length
    const fortyToFifty = data.filter(data => data.current_age >= 41 && data.current_age <= 50).length
    const fiftyToSixty = data.filter(data => data.current_age >= 51 && data.current_age <= 60).length
    const sixtyToOnward = data.filter(data => data.current_age >= 61 && data.current_age <= 100).length


    useEffect(() =>{

    },[data])
  return (
    <div className="w-full">
   <Bar data={{
    labels:["0-10","11-20","21-30","31-40","41-50","51-60","61-100"],
    datasets:[
        {   
            label:"Pwh Count Age Wise",
            data:[ageZeroToTen,tenToTwenty,twentyToThirty,thirtyToForty,fortyToFifty,fiftyToSixty,sixtyToOnward],
            backgroundColor: [
                'rgba(255, 99, 132, 0.3)',
                'rgba(255, 159, 64, 0.3)',
                'rgba(255, 205, 86, 0.3)',
                'rgba(75, 192, 192, 0.3)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.3)',
                'rgba(201, 203, 207, 0.3)',
                'rgba(154, 203, 207, 0.3)',
              ],
              borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
              ],
              borderWidth: 1
        }
    ],
   
   }}
   />
    </div>
  )
}

export default AgeBarchart