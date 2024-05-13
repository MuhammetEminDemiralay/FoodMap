import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebaseConfig";
import { Alert } from "react-native";
import { PostFile } from "../model/postFile";

export const addFile = createAsyncThunk("add/file", async (data: PostFile, state) => {

    try {
        const stateData: any = state.getState();
        console.log(stateData.file.files);
        stateData.file.files?.forEach(async (file: any, index: any) => {
            const response = await fetch(file);
            const blob = await response.blob();
            const fileName = file.split('/').pop();
            console.log(fileName);

            const storageRef = ref(storage, `file/${data.userId}.uid/${data.documentId}.post/` + `${fileName}`);
            const result = uploadBytesResumable(storageRef, blob);
            Alert.alert("file çalışştı")

        })
    } catch (error: any) {
        throw error
    }
})

type InitialState = {
    files: string[]
}

const initialState: InitialState = {
    files: []
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
    }
})

export const { imageAdd, imageDelete } = fileSlice.actions
export default fileSlice.reducer