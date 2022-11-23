import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isSearchDivOpen:false,
}

export const searchSlice = createSlice({
    name:"search member",
    initialState,
    reducers:{
        searchClose:(state)=>{
            state.isSearchDivOpen = false
        },
        searchOpen:(state) =>{
            state.isSearchDivOpen = true
        }
    }
})

export const { searchClose,searchOpen} = searchSlice.actions
export default searchSlice.reducer;