import React from 'react'

const Tabs = (props) => {
  const {value,setValue, tabArray} = props


  return (
    <>
    <div className="form-btn">
      {tabArray.map((tabs) =>{
        return (<button key={tabs} className={value === tabs? 'active': ''} onClick={(e) =>{setValue(tabs)}} >{tabs}</button>)
      })}
     </div>
     </>
  )
}

export default Tabs