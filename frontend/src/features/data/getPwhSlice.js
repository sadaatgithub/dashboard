// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import updateService from "./updateService";


// const initialState = {
//   data:[],
//   isError: false,
//   isSuccess: false,
//   isLoading: false,
//   message:'',

// }
// // export const getPwhWithId = createAsyncThunk('get_data_id',
// // async (id, thunkAPI) =>{
// //   try{
   
// //     // console.log(token);
// //     return await updateService.getPwhWithId(id)
// //   } catch (error){
// //     // console.log(error);
// //     const message =
// //         (error.response &&
// //           error.response.data &&
// //           error.response.data.detail) ||
// //         error.message ||
// //         error.toString();
// //       return thunkAPI.rejectWithValue(message);
// //   }
// // })


// export const getPwhSlice = createSlice({
//   name: 'getPwh',
//   initialState,
//   reducers:{
//     reset:(state) => {
//       state.isSuccess = false
//       // state.isSubmitSuccess = false
//       state.isLoading = false
//       state.isError = false
//       state.message = ''
//       state.data = []
//     }
// },
// extraReducers:(builder) =>{
//   builder
//     .addCase(getPwhWithId.pending, (state)=>{
//       state.isLoading = true
//     })
//     .addCase(getPwhWithId.fulfilled, (state, action) =>{
//       state.isLoading = false
//       state.isSuccess = true
//       // state.message = action.payload
//       state.data = action.payload
//     })
//     .addCase(getPwhWithId.rejected, (state, action) =>{
//       state.isLoading = false
//       state.isError = true
//       state.message = action.payload
//     })
  
// }
// })

// export const {reset} = getPwhSlice.actions
// export default getPwhSlice.reducer