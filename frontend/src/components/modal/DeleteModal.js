import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deletePwh,reset } from "../../features/data/deleteSlice";
import { fetchData } from '../../features/data/dataSlice';

const DeleteModal = ({onClick, hideModal, id,setVisible}) => {
const {isSuccess, isLoading, isError, message} = useSelector((state) =>state.deletePwh)
const dispatch = useDispatch()

  const onDelete = (e) =>{
    dispatch(deletePwh(id))
  }
  useEffect (() =>{
    if(isError){
      toast.error(message)
    }

    if(isSuccess){
        toast.success('Deleted...!')
        hideModal()
        dispatch(fetchData())
    }
    return() =>{
      dispatch(reset())
    }
// console.log(data_id);
  },[dispatch, isLoading,isSuccess, isError, message])


  return (
    <>
    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm text-black flex items-center justify-center">
      <div className=" flex flex-col items-center gap-6">
      <h3>Are you sure to delete?</h3>
      <div className="flex gap-4">
      <button onClick={hideModal} className="border px-3 py-2 rounded-md border-blue-600">Cancel</button>
      <button onClick={onDelete} className="border px-3 py-2 bg-blue-700 text-white rounded-md">Delete</button>
      </div>
      </div>
      </div>
    </>
  )
}

export default DeleteModal