import React,{useEffect, useState} from 'react'
import './form.css'

const MultiForm = () => {

const [value,setValue] = useState('tab1')
const [formSteps,setFormSteps] = useState(0)

// const onClick = (e) =>{

//   setValue(e.target.id)
//   console.log(value);
// }

const onNext = () =>{
  setFormSteps(formSteps + 1)
  // console.log(formSteps)

}
const onPrev = () =>{
setFormSteps(formSteps - 1)
  // console.log(formSteps)

}
useEffect(() =>{
  console.log(formSteps)
},[formSteps])

  return (
   <>
   <div className="container-form">
     <div className="form-left">
       <div className="form-btn">
      <button className={formSteps === 0? "active": ""} onClick={(e) =>{
        setFormSteps(0)
        console.log(e)
      }} id="tab1">Personal</button>
      <button className={formSteps === 1? "active": ""} onClick={() =>{
        setFormSteps(1)
      }} id="tab2">Educational</button>
      <button className={formSteps === 2? "active": ""} onClick={() =>{
        setFormSteps(2)
      }} id="tab3">Family</button>
      <button className={formSteps === 3? "active": ""} onClick={() =>{
        setFormSteps(3)
      }} id="tab4">Medical</button>
    </div>
     </div>
     <div className="form-right">
      {formSteps === 0 &&  <div>1</div>}
      {formSteps === 1 &&  <div>2</div>}
      {formSteps === 2 &&  <div>3</div>}
      {formSteps === 3 &&  <div>Last</div>}
    <br />
     <button onClick={onPrev} disabled={formSteps <= 0}>Prev</button>
     <button onClick={onNext} disabled={formSteps >= 3}>Next</button>
     </div>
   </div>
   </>
  )
}

export default MultiForm