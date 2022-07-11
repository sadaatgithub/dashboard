import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dataService from "./dataService";
import updateService from "./updateService";
import { useSelector } from "react-redux";
import { current } from "@reduxjs/toolkit";


const initialState = {
  data:[],
  isError: false,
  isSuccess: false,
  isLoading: false,
  isDataFetched : false,
  isDataToUpdateSuccess:false,
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
    const filterData =  thunkAPI.getState().data.data.filter((data) => data.id == id)
    // console.log(token);
    // return await updateService.getPwhWithId(id)
    // console.log(filterData)
    return filterData
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
    },
    resetUpdateId:(state)=>{
      state.isDataFetched = false
      // state.isDataToUpdateSuccess = false

    },
    updateFormdata:(state, action) =>{
      const {name, value, level} = action.payload
      state.data = level? ({...state.data,[level]
        :{...state.data[level],[name]:value}}) 
        :({...state.data,[name]:value})
      
    },
    getDataFromDb:(state,action)=>{

      const {id} = action.payload
      // const {data} = useSelector(data)
        // state.data = data


    },
  }, extraReducers:(builder) =>{
    builder 
    .addCase(createPwh.pending, (state)=>{
      state.isLoading = true
 
     })
     .addCase(createPwh.fulfilled, (state,action)=>{
       state.isLoading = false
       state.isSuccess = true
     })
     .addCase(createPwh.rejected, (state,action)=>{

      state.isLoading = false
      state.isError = true
      state.message = action.payload
     })
     .addCase(getPwhWithId.pending, (state)=>{
      state.isLoading = true
    })
    .addCase(getPwhWithId.fulfilled, (state, action) =>{
      // let {filterData} = action.payload
      state.isLoading = false
      state.isDataFetched = true
      state.isDataToUpdateSuccess = true
      state.data = action.payload
      // console.log(current(state.data))
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

export const {reset,updateFormdata,resetUpdateId,getDataFromDb} = addDataSlice.actions
export default addDataSlice.reducer