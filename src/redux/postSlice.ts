import { createAsyncThunk, createSlice, isPending, } from "@reduxjs/toolkit";
import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, query, setDoc, updateDoc } from "firebase/firestore";
import app, { db, storage } from "../../firebaseConfig";
import { Alert, LogBox } from "react-native";
import { PostData } from "../model/postData";
import { getAuth } from "firebase/auth";
import { useState } from "react";
import { data } from "../component/post/header/data";


export const addPost = createAsyncThunk("post/add", async (post: PostData, state) => {


    try {
        console.log("post", post);
        
        const { currentUser } = getAuth(app);
        const userId = currentUser?.uid;

        const docRef = doc(db, 'posts', `${userId}`)

        const isDoc = getDoc(doc(db, 'posts', `${userId}`))
        console.log("çalış");


        if (!(await isDoc).exists()) {
            console.log("Set doc çalıştı");

            await setDoc(docRef, {
                post: [
                    {
                        documentId: post.documentId,
                        lat: post.lat,
                        long: post.long,
                        like: 333,
                        comment: [],
                        description: "",
                        date: new Date()
                    }
                ]
            })

        } else {
            console.log("Update doc başladı");

            await updateDoc(docRef, {
                post: arrayUnion({
                    documentId: post.documentId,
                    lat: post.lat,
                    long: post.long,
                    like: 222,
                    comment: [],
                    description: "",
                    date: new Date()
                })
            })

            console.log("Update doc bitti");
        }


    } catch (error) {
        console.log("Hatas");
        console.log(error);

        throw error
    }
})


export const getPost = createAsyncThunk("post/getAll", async () => {
    try {
        
        const { currentUser } = getAuth(app);
        const userId = currentUser?.uid;

        const docRef = doc(db, "posts", `${userId}`)
        const data = await getDoc(docRef)
        console.log(data.data()?.post.length);

    } catch (error) {

    }
})

export const getPosts = createAsyncThunk("get/posts", async () => {

    try {
        const { currentUser } = getAuth(app);
        const userId = currentUser?.uid;

        const userRef = doc(db, "users", `${userId}`) 
        const userData = (await getDoc(userRef)).data()
        const dizi : any[] = [];
        for (let i = 0; i < userData?.friends.length; i++) {
            console.log(userData?.friends);
            
            const docRef = await getDoc(doc(db, "posts", `${userData?.friends[i]}`))
            docRef.data()?.post.forEach((item : any) => dizi.push(item))
        }
        
        console.log(dizi.length);
        
        
        
 

        
    } catch (error) {
        
    }


})

type InitialState = {
    like: number,
    comment: string[],
    description: string
}

const initialState: InitialState = {
    like: 0,
    comment: [],
    description: ""
}

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(addPost.pending, (state) => {

            })
            .addCase(addPost.fulfilled, (state, action) => {

            })
            .addCase(addPost.rejected, (state, action) => {

            })
    }
})

export default postSlice.reducer // store