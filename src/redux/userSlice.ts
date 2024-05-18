import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, arrayUnion, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import app, { db } from "../../firebaseConfig";
import { getAuth } from "firebase/auth";
import { Alert } from "react-native";
import { User } from "../model/user";

export const addUser = createAsyncThunk("add/user", async () => {

    try {
        const { currentUser } = getAuth(app)
        const userId = currentUser?.uid
        const docRef = doc(db, 'users', `${userId}`)

        await setDoc(docRef, {
            userId: userId,
            userInfo: {
                nickName: "muhammets41",
                firstName: "Muhammet",
                lastName: "Demiralay",
                tel: '05346221184',
                date: new Date()
            },
            friends: []
        })

    } catch (error) {
        throw error
    }
})


export const updateUser = createAsyncThunk("update/user", async () => {
    try {
        const { currentUser} = getAuth(app);
        const userId = currentUser?.uid;

        const docRef = doc(db, "users", `${userId}`)
        await updateDoc(docRef, {
            friends : arrayUnion("JH2OOC6EsUbR2LY1Q4SQExV5FYu2")
        })


    } catch (error) {
        throw error
    }
})


const userSlice = createSlice({
    name: 'user',
    initialState: {

    },
    reducers: {

    },
    extraReducers: (builder) => {

    }
})

export default userSlice.reducer