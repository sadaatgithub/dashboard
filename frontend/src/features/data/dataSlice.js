import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dataService from "./dataService";

const initialState = {
  data:[],
  // dataToUpdatw:[],
  isDataFetched:false,
  isError: false,
  isSuccess: false,
  isLoading: false,
  sortByName: 'default',
  sortByNameDsc : false,
  sortByFactorAsc : false,
  sortByFactorDsc : false,
  message:'',

}

export const fetchData = createAsyncThunk('fetch_data',
async (_, thunkAPI) =>{
  try{
    const token = thunkAPI.getState().auth.user
    // console.log(token);
    return await dataService.fetchData(token)
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
export const sendData = createAsyncThunk('send_data',
async (addPwh, thunkAPI) =>{
  try{
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






export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers:{
    reset:(state) => {
      state.isSuccess = false
      state.isDataFetched = false
      state.isLoading = false
      state.isError = false
      state.message = ''
      state.data = []
    },
    sortingBy:(state,action) =>{
      const sortBy = action.payload

      if(sortBy === "down"){
        state.data = state.data.sort((a,b) => { 
            let fa = a['first_name'].toLowerCase(),
            fb = b['first_name'].toLowerCase();
            return fa < fb ? '-1': fa > fb? '1': '0'})
        console.log('sortin A-Z')
        state.sortByName = "down"
      }

      if(sortBy === "up"){
        state.data = state.data.sort((a,b) => { 
            let fa = a['first_name'].toLowerCase(),
            fb = b['first_name'].toLowerCase();
            return fa > fb ? '-1': fa < fb? '1': '0'})
        state.sortByName = "up"

        console.log('sortin Z-A')
      }
      if(sortBy === "default"){
        state.data = state.data.sort((a,b) => a['first_name'])
        state.sortByName = "default"

        console.log('sortin default')
      }

        // console.log(data)
    }
},
extraReducers:(builder) =>{
  builder
    .addCase(fetchData.pending, (state)=>{
      state.isLoading = true
    })
    .addCase(fetchData.fulfilled, (state, action) =>{
      state.isLoading = false
      state.isSuccess = true
      state.isDataFetched = true
      // state.message = action.payload
      state.data = action.payload
    })
    .addCase(fetchData.rejected, (state, action) =>{
      state.isLoading = false
      state.isError = true
      state.isDataFetched = false
      state.message = action.payload
    })
    // .addCase(sendData.pending, (state)=>{
    //  state.isLoading = true

    // })
    // .addCase(sendData.fulfilled, (state,action)=>{
    //   state.isLoading = false
    //   state.isSuccess = true
    //   console.log('fulfilled');
    // })
    // .addCase(sendData.rejected, (state,action)=>{
    //  state.isLoading = false
    //  state.isError = true
    //  state.message = action.payload
    // })
  
}

})


export const { reset , sortingBy} = dataSlice.actions
export default dataSlice.reducer;


// const token = thunkAPI.getState().auth.user
// 