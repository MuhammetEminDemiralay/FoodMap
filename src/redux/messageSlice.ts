import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



export const messageAdd = createAsyncThunk("add/message", async () => {

})


const initialState = {

}

const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
    }
})




export default messageSlice.reducer