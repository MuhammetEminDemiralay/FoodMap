import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllUser } from "./userSlice";
import { push, ref, set } from "firebase/database";
import { realdb } from "../../firebaseConfig";


interface FollowModel {
    senderId: string,
    recieverId: string
}

export const followUser = createAsyncThunk("follow/user", async ({ senderId, recieverId }: FollowModel) => {

    try {


        const receiverRef = ref(realdb, `followUser/${recieverId}/${senderId}`)
        push(receiverRef, { message: "Seni bekliyorum" });
        console.log(receiverRef);



    } catch (error) {
        throw error
    }

})

export const unFollowUser = createAsyncThunk("unFollow/user", async () => {

})




const followSlice = createSlice({
    name: "follow",
    initialState: {
        userData: []
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllUser.pending, (state) => {

            })
            .addCase(getAllUser.fulfilled, (state, action) => {

            })
            .addCase(getAllUser.rejected, (state, action) => {

            })
    }
})


export default followSlice.reducer