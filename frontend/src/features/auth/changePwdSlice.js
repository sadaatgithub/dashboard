import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dataService from "../data/dataService";



const initialState  = {
  isError:false,
  isSuccess:false,
  isLoading:false,
  message:'',
};

export const changePassword = createAsyncThunk(
  "change-password", async (data, thunkAPI) =>{
    try {
      return await dataService.changePassword(data);
    } catch(error){
      const message =
      (error.response &&
        error.response.data &&
        error.response.data.detail) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
    }
  }
)

export const changePasswordSlice = createSlice({
  name:"changePassword",
  initialState,
  reducers:{
    reset:(state) =>{
      state.isLoading = false;
      state.isError  = false
      state.isSuccess = false
      state.message = ''
    }
  }, extraReducers: (builder) =>{
    builder 
      .addCase(changePassword.pending, (state) =>{
        state.isLoading = true
      })
      .addCase(changePassword.fulfilled, (state,action) =>{
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        // state.message = action.payload
      })
      .addCase(changePassword.rejected, (state, action) =>{
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
})

export const {reset} = changePasswordSlice.actions
export default changePasswordSlice.reducer