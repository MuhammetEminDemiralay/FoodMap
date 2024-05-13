import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { Alert } from "react-native";
import { PostData } from "../model/postData";


export const addPost = createAsyncThunk("post/add", async (post: PostData, state) => {

    
    try {
        await addDoc(collection(db, `posts/${post.userId}.userId/${post.documentId}.postId`), {
            documentId: post.documentId,
            lat: post.lat,
            long: post.long,
            like: 0,
            comment: [],
            description : "",
            date: new Date()
        })
        console.log(post);

    } catch (error) {
        throw error
    }
})

type InitialState = {
    like: number,
    comment: string[],
    description : string
}

const initialState: InitialState = {
    like: 0,
    comment: [],
    description : ""
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