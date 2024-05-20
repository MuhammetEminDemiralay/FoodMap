import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDownloadURL, listAll, ref, uploadBytesResumable } from "firebase/storage";
import app, { db, storage } from "../../firebaseConfig";
import { Alert } from "react-native";
import { PostFile } from "../model/postFile";
import { useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export const addFile = createAsyncThunk("add/file", async (data: PostFile, state) => {

    try {
        const stateData: any = state.getState();
        const { currentUser } = getAuth(app)
        const userId = currentUser?.uid;
        stateData.file.files?.forEach(async (file: any, index: any) => {
            const response = await fetch(file);
            const blob = await response.blob();
            const fileName = file.split('/').pop();

            const storageRef = ref(storage, `file/${userId}/${data.documentId}/` + `${fileName}`);
            uploadBytesResumable(storageRef, blob);
        })

    } catch (error: any) {
        throw error
    }
})

export const getFiles = createAsyncThunk("get/files", async () => {

    try {

        const files: any[] = [];
        let documents: any[] = []

        const { currentUser } = getAuth(app);
        const userId = currentUser?.uid;
        const userRef = doc(db, "users", `${userId}`)
        const userData = (await getDoc(userRef)).data()


        for (let i = 0; i < userData?.friends.length; i++) {
            const rootFileRef = ref(storage, `file/${userData?.friends[i]}`)
            const folderResult = await listAll(rootFileRef)

            for (const documentResult of folderResult.prefixes) {

                const docRef = ref(storage, `${documentResult.fullPath}`)
                const docs = await listAll(docRef);
                for (const doc of docs.items) {
                    const docUrl = await getDownloadURL(ref(storage, `${doc.fullPath}`))
                    documents.push({ fileUrl: docUrl })

                }
                files.push({ documentId: documentResult.name, documents: documents })
                documents = []
            }
        }


        
        return files;

    } catch (error) {
        throw error;
    }
})


type InitialState = {
    files: string[]
    fileDatas: any[]
}

const initialState: InitialState = {
    files: [],
    fileDatas: []
}

export const fileSlice = createSlice({
    name: "file",
    initialState,
    reducers: {
        imageAdd: (state, action) => {
            state.files = [...state.files, action.payload];
        },
        imageDelete: (state, action) => {
            state.files = state.files.filter(file => file != action.payload);
        }
    },
    extraReducers: (builder) => {
        builder.
            addCase(addFile.pending, (state) => {

            })
            .addCase(addFile.fulfilled, (state, action) => {

            })
            .addCase(addFile.rejected, (state, action) => {

            })

            // Get file
            .addCase(getFiles.pending, (state) => {

            })
            .addCase(getFiles.fulfilled, (state, action) => {
                state.fileDatas = action.payload

            })
            .addCase(getFiles.rejected, (state, action) => {

            })
    }
})

export const { imageAdd, imageDelete } = fileSlice.actions
export default fileSlice.reducer