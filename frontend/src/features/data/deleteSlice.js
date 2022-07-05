import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import dataService from "./dataService";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message:'',
}
export const deletePwh = createAsyncThunk('delete_pwh',
async (id, thunkAPI) =>{
  try{
   
    // console.log(token);
    return await dataService.deletePwh(id)
  } catch (error){
    // console.log(error);
    const message =
        (error.response &&
          error.response.data &&
          error.response.data.detail) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
  }
})

export const deleteSlice = createSlice({
  name:'deletePwh',
  initialState,
  reducers:{
    reset:(state)=> {
      state.isError = false
      state.isSuccess = false
      state.isLoading = false
      state.message=''
    }
  }, extraReducers:(builder) =>{
    builder 
      .addCase(deletePwh.pending, (state) =>{
        state.isLoading = true
      })
      .addCase(deletePwh.fulfilled, (state,action) =>{
        state.isSuccess = true
        state.isLoading = false
      })
      .addCase(deletePwh.rejected, (state,action) =>{
        state.isSuccess = false
        state.isLoading = false
        state.message = action.message

      })
  }
})
export const {reset} = deleteSlice.actions
export default deleteSlice.reducer