import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import app, { db, storage } from "../../firebaseConfig";
import { getAuth } from "firebase/auth";
import { Alert } from "react-native";
import { InitialState } from "@react-navigation/native";
import { User } from "../model/user";
import { useSelector } from "react-redux";
import { getDownloadURL, list, ref } from "firebase/storage";
import { push } from "firebase/database";



export const addUser = createAsyncThunk("add/user", async (user: any) => {


    try {
        const { currentUser } = getAuth(app)
        const userId = currentUser?.uid
        const docRef = doc(db, 'users', `${userId}`)

        await setDoc(docRef, {
            userId: userId,
            userInfo: {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                nickName: user.nickName,
                phone: user.phone,
                dateOfBirth: user.dateOfBirth,
            },
            joiningTime: new Date(),
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

export const getUser = createAsyncThunk("get/user", async () => {
    try {
        const { currentUser } = getAuth(app);
        const userId = currentUser?.uid;

        const userRef = doc(db, `users/${userId}`)
        const userProfilRef = ref(storage, `userProfile/${userId}`)


        const getData = await getDoc(userRef);
        const data = getData.data();
        const profileData = await list(userProfilRef)


        let downloadData = ''
        for (let profil of profileData.items) {
            const reff = ref(storage, profil.fullPath)
            const data = await getDownloadURL(reff)
            downloadData = data;
        }

        const userData = {
            profileImage: downloadData,
            userData: data
        }

        return userData


    } catch (error) {
        console.log(error);

        throw error
    }
})


interface IntialState {
    userData?: any[];
    currentUser: {}
}

const initialState: IntialState = {
    userData: [],
    currentUser: {}
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

            .addCase(getUser.pending, (state) => {

            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.currentUser = action.payload;
            })
            .addCase(getUser.rejected, (state, action) => {

            })
    }
})

export default userSlice.reducer