import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { fetchData } from '../../features/data/dataSlice';

import { updateTags, reset } from '../../features/data/updatePwhSlice';

const ManageModal = (props) => {
const {hideModal} = props
  const {isLoading,isSuccess} = useSelector((state) => state.updatePwh)
  const {data} = useSelector((state) => state.data)
  const dispatch = useDispatch()
  const [manageState, setManageState] = useState({
    id:props.id,
    tag:'',
  })

const onSubmit = (e) =>{
  e.preventDefault()
console.log(manageState);
dispatch(updateTags(manageState))
}

const tagShow = data.filter((data) => data.id === props.id)
const onChange = (e) =>{
  setManageState((prevState) =>({
    ...prevState, 
  
    [e.target.name] : e.target.value,
  }))
}

  useEffect(() =>{
console.log(tagShow[0].tag);
if(isSuccess){
  hideModal()
  dispatch(fetchData())
  dispatch(reset())

}

  },[isSuccess])
  return (
    <>
    <div className="absolute left-0 top-0 bottom-10 right-0  text-white bg-white/50 backdrop-blur-sm flex justify-center items-center">
      <form onSubmit={onSubmit} className="flex justify-center items-center gap-x-6 h-1/2  mt-auto bg-gray-600/70 w-full">
      <label htmlFor="">Select &nbsp;  
    <select name="tag" id="" className="text-gray-600 text-sm p-1" onChange={onChange} defaultValue={tagShow[0].tag}>
      <option value=""   disabled>{tagShow.tag? tagShow.tag :"---Select--" }</option>
      <option value="Transfered">Transfered</option>
      <option value="Deceased">Deceased</option>
      <option value="Blocked">Blocked</option>
      <option value="Duplicate">Duplicate</option>
      <option value="Not Our Member">Not Our Member</option>
      <option value="Non PwH">Non PwH</option>
      </select>
      </label>
      <button className="bg-blue-800 p-1 px-3">{isLoading? 'Requesting' : "Submit"}</button>
      </form>
      </div>
    
      </>
  )
}

export default ManageModal