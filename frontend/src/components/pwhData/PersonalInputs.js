import React from 'react'
import InputElement from '../InputElement'

const PersonalInputs = (props) => {

  return (
    <>
    <label htmlFor="first_name">First Name</label>
    <InputElement type='text' name={'first_name'} value={props.addPwh.first_name} 
    onChange={props.inputHandler()}/>
    </>
  )
}

export default PersonalInputs