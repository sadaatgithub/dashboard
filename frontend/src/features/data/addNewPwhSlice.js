import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dataService from "./dataService";
import updateService from "./updateService";



const initialState = {
  data:[],
  isError: false,
  isSuccess: false,
  isLoading: false,
  isDataFetched : false,
  message:'',
  
}

export const createPwh = createAsyncThunk('add_pwh',
async (addPwh, thunkAPI) =>{
  try{
    // const token = thunkAPI.getState().auth.user
    // console.log(token);
    return await dataService.sendData(addPwh)
  } catch (error){
    console.log(error);
    const message =
        (error.response &&
          error.response.data &&
          error.response.data.detail) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
  }
})
export const updatePwh = createAsyncThunk('update_pwh_data',
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

export const getPwhWithId = createAsyncThunk('get_data_id',
async (id, thunkAPI) =>{
  try{
   
    // console.log(token);
    return await updateService.getPwhWithId(id)
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


export const addDataSlice = createSlice({
  name:'createPwh',
  initialState,
  reducers:{
    reset:(state) =>{
      state.isSuccess = false
      state.isLoading = false
      state.isError = false
      state.message = ''
      state.isDataFetched = false
      state.data = []
    }
  }, extraReducers:(builder) =>{
    builder 
    .addCase(createPwh.pending, (state)=>{
      state.isLoading = true
 
     })
     .addCase(createPwh.fulfilled, (state,action)=>{
       state.isLoading = false
       state.isSuccess = true
      //  console.log('fulfilled');
     })
     .addCase(createPwh.rejected, (state,action)=>{
      state.isLoading = false
      state.isError = true
      state.message = action.payload
     })
     .addCase(getPwhWithId.pending, (state)=>{
      // state.isLoading = true
    })
    .addCase(getPwhWithId.fulfilled, (state, action) =>{
      // state.isLoading = false
      state.isDataFetched = true
      // state.message = action.payload
      state.data = action.payload
    })
    .addCase(getPwhWithId.rejected, (state, action) =>{
      // state.isLoading = false
      // state.isError = true
      state.message = action.payload
    })
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
  }
})

export const {reset} = addDataSlice.actions
export default addDataSlice.reducer