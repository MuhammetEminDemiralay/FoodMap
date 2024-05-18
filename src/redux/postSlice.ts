import { createAsyncThunk, createSlice, isPending, } from "@reduxjs/toolkit";
import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, query, setDoc, updateDoc } from "firebase/firestore";
import app, { db, storage } from "../../firebaseConfig";
import { PostData } from "../model/postData";
import { getAuth } from "firebase/auth";
import { useState } from "react";
import { data } from "../component/post/header/data";


export const addPost = createAsyncThunk("post/add", async (post: PostData, state) => {


    try {

        const { currentUser } = getAuth(app);
        const userId = currentUser?.uid;
        const docRef = doc(db, 'posts', `${userId}`)
        const isDoc = getDoc(doc(db, 'posts', `${userId}`))

        if (!(await isDoc).exists()) {
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
        }
    } catch (error) {
        throw error
    }
})


export const getPost = createAsyncThunk("post/getAll", async () => {
    try {

        const { currentUser } = getAuth(app);
        const userId = currentUser?.uid;
        const docRef = doc(db, "posts", `${userId}`)
        const data = await getDoc(docRef)

    } catch (error) {
        throw error
    }
})

export const getPosts = createAsyncThunk("get/posts", async () => {

    try {
        const { currentUser } = getAuth(app);
        const userId = currentUser?.uid;

        const userRef = doc(db, "users", `${userId}`)
        const userData = (await getDoc(userRef)).data()

        const userItems: any[] = [];

        for (let i = 0; i < userData?.friends.length; i++) {

            const docRef = await getDoc(doc(db, "posts", `${userData?.friends[i]}`))
            docRef.data()?.post.forEach((item: any) => userItems.push(item))
        }

        const sortedData = userItems.sort((a, b) => a.date.toDate() - b.date.toDate());

        
        return sortedData

    } catch (error) {
        throw error
    }


})

type InitialState = {
    like: number,
    comment: string[],
    description: string,
    postDatas: PostData[]
}

const initialState: InitialState = {
    like: 0,
    comment: [],
    description: "",
    postDatas: []
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

            .addCase(getPosts.pending, (state) => {

            })
            .addCase(getPosts.fulfilled, (state, action) => {
                state.postDatas = action.payload;
            })
            .addCase(getPosts.rejected, (state, action) => {

            })
    }
})

export default postSlice.reducer // store