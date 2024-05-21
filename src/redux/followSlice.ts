import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllUser } from "./userSlice";
import { get, onValue, push, ref, serverTimestamp, set } from "firebase/database";
import app, { realdb } from "../../firebaseConfig";
import { getAuth } from "firebase/auth";
import { Alert } from "react-native";




export const followUser = createAsyncThunk("follow/user", async (recieverId: string) => {

    try {
        const { currentUser } = getAuth(app);
        const senderId = currentUser?.uid;
        const receiverRef = ref(realdb, `followUser/${recieverId}/${senderId}`)
        await set(receiverRef, {
            requestStatues: false,
            time: serverTimestamp()
        })
    } catch (error) {
        throw error
    }

})


export const getFollow = createAsyncThunk("get/follow", async () => {
    try {
        console.log("calısşt");

        const { currentUser } = getAuth(app);
        const userId = currentUser?.uid;
        const docRef = ref(realdb, `followUser/${userId}`)

        onValue(docRef, (snapShot) => {
            Alert.alert(`${snapShot.val()}`)
            Alert.alert("1");
        })
        
        
    } catch (error) {

    }
})



export const unFollowUser = createAsyncThunk("unFollow/user", async () => {

})


//TakipÇİ onay listesini veri ekle
export const addFollowWatchState = createAsyncThunk("add/followWatchState", async (receiverId: string) => {
    try {
        const { currentUser } = getAuth(app);
        const userId = currentUser?.uid
        const docRef = ref(realdb, `followWatchState/${userId}`)
        push(docRef, {
            receiverId: receiverId,
            wathcState: true
        })

    } catch (error) {
        throw error
    }
})

// TakipÇİ onay listesini çek
export const listFollowWatchState = createAsyncThunk("check/followWatchState", async () => {
    try {
        const { currentUser } = getAuth(app);
        const userId = currentUser?.uid;

        const docRef = ref(realdb, `followeWatchState/${userId}`)
        const data = await get(docRef);
        data.forEach(item => console.log(item.val()))
        console.log("Tetiklendi");
        

    } catch (error) {

    }
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