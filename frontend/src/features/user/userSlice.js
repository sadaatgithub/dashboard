import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import dataService from "../data/dataService";

const user_detail = localStorage.getItem("user_detail");

const initialState = {
  userDetail: user_detail? user_detail:null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
}

export const fetchUser = createAsyncThunk(
"fetch_user", async (token, thunkAPI) =>
{
  try{
    const user_url = "auth/users/me/"
      return await dataService.fetchUser(token,user_url)
  } catch (error){
    console.log(error)
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

export const userSlice = createSlice({
  name:"fetchUser",
  initialState,
  reducers:{
    reset:(state) =>{
      state.userDetail = null
      state.isLoading = false
      state.isError  = false
      state.isSuccess = false
      state.message = ''
    },
    partial_reset:(state) =>{
      // state.userDetail = []
      state.isLoading = false
      state.isError  = false
      state.isSuccess = false
      state.message = ''
    }
  },
  extraReducers:(builder) =>{
    builder
      .addCase(fetchUser.pending, (state) =>{
        state.isLoading = true
      })
      .addCase(fetchUser.fulfilled, (state,action) =>{
        state.isLoading = false
        state.isSuccess  = true
        state.userDetail = action.payload
      })
      .addCase(fetchUser.rejected, (state,action) =>{
        state.isError = true
        state.message = action.payload
      })
  }
});

export const {reset, partial_reset} = userSlice.actions;
export default userSlice.reducer
