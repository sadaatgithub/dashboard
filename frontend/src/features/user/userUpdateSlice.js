import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import dataService from "../data/dataService";


const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
}

export const userUpdate = createAsyncThunk('adress/update', 
async (data, thunkAPI) =>{
  try{
    // const user_update_url = ""
    return await dataService.userUpdate(data)
  } catch(error) {
    
    const message =
    (error.response &&
      error.response.data &&
      error.response.data.detail) ||
    error.message ||
    error.toString();
  return thunkAPI.rejectWithValue(message);
  }
})

export const userUpdateSlice = createSlice({
  name:"userUpdate",
  initialState,
  reducers:{
    reset:(state) =>{
      state.isLoading = false
      state.isError  = false
      state.isSuccess = false
      state.message = ''
    }
  },
  extraReducers:(builder) =>{
    builder
      .addCase(userUpdate.pending, (state) =>{
        state.isLoading  = true
      })
      .addCase(userUpdate.fulfilled, (state,action) =>{
        state.isLoading = false
        state.isSuccess  = true
      })
      .addCase(userUpdate.rejected, (state,action) =>{
        state.isError = true
        state.message = action.payload
      })
  }
});

export const {reset} = userUpdateSlice.actions
export default userUpdateSlice.reducer