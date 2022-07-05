import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dataService from "./dataService";
import updateService from "./updateService";



const initialState = {
  // data:[],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message:'',
  
}
export const updatePwh = createAsyncThunk('update_data',
async (data, thunkAPI) =>{
  try{
   
    // console.log(token);
    return await updateService.updatePwh(data)
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

export const updateTags = createAsyncThunk('update_tag', async(data, thunkAPI) =>{

  try{
    return await dataService.updateTag(data)
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

export const updatePwhSlice = createSlice({
  name:'updatePwh',
  initialState,
  reducers:{
    reset:(state) =>{
      state.isSuccess = false
      state.isLoading = false
      state.isError = false
      state.message = ''
      // state.data = []
    }
  }, extraReducers:(builder) =>{
    builder 
    .addCase(updatePwh.pending, (state)=>{
      state.isLoading = true
 
     })
     .addCase(updatePwh.fulfilled, (state,action)=>{
       state.isLoading = false
       state.isSuccess = true
      //  console.log('fulfilled');
     })
     .addCase(updatePwh.rejected, (state,action)=>{
      state.isLoading = false
      state.isError = true
      state.message = action.payload
     })
    .addCase(updateTags.pending, (state)=>{
      state.isLoading = true
 
     })
     .addCase(updateTags.fulfilled, (state,action)=>{
       state.isLoading = false
       state.isSuccess = true
      //  console.log('fulfilled');
     })
     .addCase(updateTags.rejected, (state,action)=>{
      state.isLoading = false
      state.isError = true
      state.message = action.payload
     })
  }
})

export const {reset} = updatePwhSlice.actions
export default updatePwhSlice.reducer