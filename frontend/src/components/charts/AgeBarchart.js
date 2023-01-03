import {Bar} from "react-chartjs-2"
import {Chart as ChartJS} from "chart.js/auto"
import { useSelector } from 'react-redux'
import { useEffect } from "react"

const AgeBarchart = () => {
    const { data } = useSelector((state)=>state.data)
 

    let uptoTen = []
    let tenTwenty = []
    let twentyThirty = []
    let thirtyForty = []
    let fortyFifty = []
    let fiftySixty = []
    let sixtyOnward = []

  const ageCounts = () =>{ data.map((data)=>data.current_age).forEach((data)=>
      data<=10? uptoTen.push(data)
      : data >=11 && data <=20? tenTwenty.push(data)
      : data >=21 && data <=30? twentyThirty.push(data)
      : data>=31 && data <=40? thirtyForty.push(data)
      : data >= 41 && data <=50? fortyFifty.push(data)
      :data >= 51 && data <=60? fiftySixty.push(data)
      : sixtyOnward.push(data)
  )
}
ageCounts()

useEffect(() =>{
},[data])

//filtering using reduce?
  return (
    <div className="w-full px-1">
   <Bar data={{
    labels:["0-10","11-20","21-30","31-40","41-50","51-60","61-100"],
    datasets:[
        {   
            label:"Pwh Count Age Wise",
            data:[uptoTen.length,tenTwenty.length,twentyThirty.length,thirtyForty.length,fortyFifty.length,fiftySixty.length,sixtyOnward.length],
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