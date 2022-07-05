import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice';
import dataReducer from '../features/data/dataSlice'
import createPwhReducer from '../features/data/addNewPwhSlice'
import deletePwhReducer from '../features/data/deleteSlice'
import fetchUserReducer from '../features/user/userSlice'
import changePasswordReducer from '../features/auth/changePwdSlice'
import userUpdateSliceReducer from "../features/user/userUpdateSlice";
import uploadImageSliceReducer from "../features/data/uploadImageSlice"
import updatePwhSliceReducer from "../features/data/updatePwhSlice"


export const store = configureStore({
  reducer:{
    auth:authReducer,
    data:dataReducer,
    createPwh:createPwhReducer,
    fetchUser:fetchUserReducer,
    deletePwh:deletePwhReducer,
    changePassword:changePasswordReducer,
    userUpdate:userUpdateSliceReducer,
    uploadImage:uploadImageSliceReducer,
    updatePwh:updatePwhSliceReducer,
  },
})