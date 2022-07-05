import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dataService from "./dataService";

const initialState = {
  isSuccess:false,
  isError:false,
  isLoading:false,
  message:'',
}

export const uploadImage = createAsyncThunk('uploading_image' ,
async(postImage, thunkAPI) =>{
  try{
    return await dataService.uploadImage(postImage)
  } catch(error){
    const message =
    (error.response &&
      error.response.data &&
      error.response.data.detail) ||
    error.message ||
    error.toString();
  return thunkAPI.rejectWithValue(message);
  }
})

export const uploadImageSlice = createSlice({
  name:'uploadImage',
  initialState,
  reducers:{
    reset:(state) =>{
      state.isSuccess = false
      state.isLoading = false
      state.isError = false
    }
  }, extraReducers:(builder) =>{
    builder
        .addCase(uploadImage.pending, (state) =>{
          state.isLoading = true
        })
        .addCase(uploadImage.fulfilled, (state,action) =>{
          state.isLoading = false
          state.isSuccess = true
          state.message = 'Image Uploaded Successfully....!'
        })
        .addCase(uploadImage.rejected, (state, action) =>{
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })
  }
})

export const {reset} = uploadImageSlice.actions
export default uploadImageSlice.reducer