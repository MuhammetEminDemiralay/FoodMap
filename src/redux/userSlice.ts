import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, arrayUnion, collection, doc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import app, { db } from "../../firebaseConfig";
import { getAuth } from "firebase/auth";
import { Alert } from "react-native";
import { User } from "../model/user";
import { InitialState } from "@react-navigation/native";




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
        const { currentUser } = getAuth(app);
        const userId = currentUser?.uid;

        const docRef = doc(db, "users", `${userId}`)
        await updateDoc(docRef, {
            friends: arrayUnion("JH2OOC6EsUbR2LY1Q4SQExV5FYu2")
        })


    } catch (error) {
        throw error
    }
})

export const getAllUser = createAsyncThunk("getAll/user", async () => {
    try {

        const userData: any[] = [];

        const { currentUser } = getAuth(app);
        const userId = currentUser?.uid;

        const folderRef = collection(db, "users");
        const docs = await getDocs(folderRef);
        for (const doc of docs.docs) {
            userData.push(doc.data());
        }
        
        return userData;

    } catch (error) {

    }
})


interface IntialState {
    userData? : any[];
}

const initialState: IntialState = {
    userData : []
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllUser.pending, (state) => {

            })
            .addCase(getAllUser.fulfilled, (state, action) => {
                state.userData = action.payload;
            })
            .addCase(getAllUser.rejected, (state, action) => {

            })
    }
})

export default userSlice.reducer