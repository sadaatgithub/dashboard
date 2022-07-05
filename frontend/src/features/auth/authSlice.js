import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../auth/authService";

const user = localStorage.getItem("user");
const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// login User

export const login = createAsyncThunk(
  "auth/jwt/create/",
  async (user, thunkAPI) => {
    try {
      return await authService.login(user);
    } catch (error) {
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
);
export const logout = createAsyncThunk('auth/logout', 
                      async () => await authService.logout())


export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError  = false
      state.isSuccess = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) =>{
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) =>{
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        // state.message = 'Log in success..!'
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) =>{
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(logout.fulfilled, (state) =>{
        state.user = null

        // state.message = "Logged Out Successfully...!"
      })
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
