import React,{useEffect, useState} from 'react'
import './form.css'

const MultiForm = () => {

const [value,setValue] = useState('tab1')

// const onClick = (e) =>{

//   setValue(e.target.id)
//   console.log(value);
// }
useEffect(() =>{
  console.log(value);
})

  return (
   <>
   <div className="container-form">
     <div className="form-left">
       <div className="form-btn">
      <button className={value === 'tab1'? "active": ""} onClick={(e) =>{
        setValue('tab1')
        console.log(e)
      }} id="tab1">Personal</button>
      <button className={value === 'tab2'? "active": ""} onClick={() =>{
        setValue('tab2')
      }} id="tab2">Educational</button>
      <button className={value === 'tab3'? "active": ""} onClick={() =>{
        setValue('tab3')
      }} id="tab3">Family</button>
      <button className={value === 'tab4'? "active": ""} onClick={() =>{
        setValue('tab4')
      }} id="tab4">Medical</button>
    </div>
     </div>
     <div className="form-right">
     <div className={value === 'tab1'? "show": ""}>1</div>
     <div className={value === 'tab2'? "show": ""}>2</div>
     <div className={value === 'tab3'? "show": ""}>3</div>
     <div className={value === 'tab4'? "show": ""}>4</div>
     </div>
   </div>
   </>
  )
}

export default MultiForm