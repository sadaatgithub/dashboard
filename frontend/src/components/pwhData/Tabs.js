import React from 'react'

const Tabs = (props) => {
  const {formSteps,setFormSteps, tabArray} = props


  return (
    <>
    <div className="form-btn">
      {tabArray.map((step,index) =>{
        return (<button key={index} className={formSteps === index? 'active': ''} onClick={(e) =>{setFormSteps(index)}} >{step}</button>)
      })}
     </div>
     </>
  )
}

export default Tabs