import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDownloadURL, listAll, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebaseConfig";
import { Alert } from "react-native";
import { PostFile } from "../model/postFile";
import { useState } from "react";

export const addFile = createAsyncThunk("add/file", async (data: PostFile, state) => {

    try {
        const stateData: any = state.getState();
        stateData.file.files?.forEach(async (file: any, index: any) => {
            const response = await fetch(file);
            const blob = await response.blob();
            const fileName = file.split('/').pop();

            const storageRef = ref(storage, `file/${data.userId}.uid/${data.documentId}.post/` + `${fileName}`);
            const result = uploadBytesResumable(storageRef, blob);

        })
    } catch (error: any) {
        throw error
    }
})

export const getFiles = createAsyncThunk("get/files", async () => {

    try {
        const posts = [];
        let documents: string[] = []

        const rootFileRef = ref(storage, "file")
        const result = await listAll(rootFileRef);
        for (const userFolder of result.prefixes) {

            const userFolderRef = ref(storage, userFolder.fullPath);
            const userResult = await listAll(userFolderRef);
            for (const documentFolder of userResult.prefixes) {
                const userDocumentRef = ref(storage, documentFolder.fullPath);
                const documentResult = await listAll(userDocumentRef);
                for (const doc of documentResult.items) {
                    const url = await getDownloadURL(ref(storage, `${doc.fullPath}`))
                    documents.push(url)
                }
                posts.push(documents)
                documents = []

            }
        }
        return posts;

    } catch (error) {

    }
})


type InitialState = {
    files: string[]
    data?: any[]
}

const initialState: InitialState = {
    files: [],
    data: []
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
                state.data = action.payload
            })
            .addCase(getFiles.rejected, (state, action) => {

            })
    }
})

export const { imageAdd, imageDelete } = fileSlice.actions
export default fileSlice.reducer