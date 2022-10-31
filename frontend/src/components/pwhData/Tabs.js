import React from 'react'

const Tabs = (props) => {
  const {formSteps,setFormSteps, tabArray} = props


  return (
    <>
    <div className="flex flex-col gap-1">
      {tabArray.map((step,index) =>{
        return (<button key={index} className={`${formSteps === index? "bg-blue-500 text-white text-base": "bg-gray-100 text-gray-700"} font-medium  text-left p-2 border border-transparent hover:border-sky-600 cursor-pointer`} onClick={(e) =>{setFormSteps(index)}} >{step}</button>)
      })}
     </div>
     </>
  )
}

export default Tabs