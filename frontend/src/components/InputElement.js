import React, { useState } from 'react'

const InputElement = (props) => {

const {value,inputHandler,name, type} = props; 
  return (
    <>
    {/* <label>{label}</label>
    <input {...inputProps} onChange={onChange()}/> */}
    
    <input type={type} value={value} onChange={inputHandler}/>
    </>
  )
}

export default InputElement