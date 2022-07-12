import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deletePwh } from "../../features/data/deleteSlice";

const DeleteModal = ({onClick, hideModal, id}) => {
const {isSuccess, isLoading, isError, message} = useSelector((state) =>state.deletePwh)
const dispatch = useDispatch()
const navigate = useNavigate()

  const onDelete = (e) =>{
    dispatch(deletePwh(id))
    console.log(id);
  }
  useEffect (() =>{
    if(isError){
      toast.error(message)
    }

    if(isSuccess){
        // console.log('success');
        toast.success('Deleted...!')
        window.location.reload();
    }
// console.log(data_id);
  },[dispatch, isLoading,isSuccess, isError, message])


  return (
    <>
    <div className="delete-modal">
      <div className="modal-inner">
      <h3>Are you sure to delete?</h3>
      <div className="modal-action">
      <button onClick={hideModal} className="btn-cancel">Cancel</button>
      <button onClick={onDelete}>Delete</button>
      </div>
      </div>
      </div>
    </>
  )
}

export default DeleteModal