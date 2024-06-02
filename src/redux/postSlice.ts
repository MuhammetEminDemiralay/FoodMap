import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import app, { db, realdb } from "../../firebaseConfig";
import { PostData } from "../model/postData";
import { getAuth } from "firebase/auth";
import { get, ref } from "firebase/database";



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


export const getUserPost = createAsyncThunk("userPost/getAll", async () => {
    try {
        const { currentUser } = getAuth(app);
        const userId = currentUser?.uid;
        const docRef = doc(db, "posts", `${userId}`)
        const data = await getDoc(docRef)
        const userPost = data.data();
        return userPost
    } catch (error) {
        throw error
    }
})

export const getFriendsPosts = createAsyncThunk("get/posts", async () => {
    try {
        const { currentUser } = getAuth(app);
        const userId = currentUser?.uid;
        
        const userItems: any[] = [];

        const docRef = ref(realdb, `followedList/${userId}`)
        const friendData = (await get(docRef)).val()
        const dataIds = Object.keys(friendData);



        for (let i = 0; i < dataIds?.length; i++) {
            const docRef = await getDoc(doc(db, "posts", `${dataIds[i]}`))
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
    postFriendsDatas: any[],
    userPosts?: {}
}

const initialState: InitialState = {
    like: 0,
    comment: [],
    description: "",
    postFriendsDatas: [],
    userPosts: {}
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

            .addCase(getFriendsPosts.pending, (state) => {

            })
            .addCase(getFriendsPosts.fulfilled, (state, action) => {
                state.postFriendsDatas = action.payload;
            })
            .addCase(getFriendsPosts.rejected, (state, action) => {

            })


            .addCase(getUserPost.pending, (state) => {

            })
            .addCase(getUserPost.fulfilled, (state, action) => {
                state.userPosts = action.payload;
            })
            .addCase(getUserPost.rejected, (state, action) => {

            })
    }
})

export default postSlice.reducer // store