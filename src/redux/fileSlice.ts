import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteObject, getDownloadURL, list, listAll, ref, uploadBytesResumable } from "firebase/storage";
import app, { db, realdb, storage } from "../../firebaseConfig";
import { PostFile } from "../model/postFile";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import * as RealTime from 'firebase/database'

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

export const getFriendsFiles = createAsyncThunk("get/files", async () => {

    try {

        const files: any[] = [];
        let documents: any[] = []

        const { currentUser } = getAuth(app);
        const userId = currentUser?.uid;

        const docRef = RealTime.ref(realdb, `followedList/${userId}`)

        const friendData = (await RealTime.get(docRef)).val()

        const dataIds = Object.keys(friendData);


        for (let i = 0; i < dataIds?.length; i++) {
            const rootFileRef = ref(storage, `file/${dataIds[i]}`)
            const folderResult = await listAll(rootFileRef)

            for (const documentResult of folderResult.prefixes) {

                const docRef = ref(storage, `${documentResult.fullPath}`)
                const docs = await listAll(docRef);
                for (const doc of docs.items) {
                    const docUrl = await getDownloadURL(ref(storage, `${doc.fullPath}`))
                    documents.push(docUrl)
                }
                files.push({ documentId: documentResult.name, fileUrl: documents, userId: dataIds[i] })
                documents = []
            }
        }

        const datas = {
            files: files,
            friendsIds: dataIds
        }

        return datas;

    } catch (error) {
        throw error;
    }
})


export const addUserProfile = createAsyncThunk("add/userProfile", async (data: any, state: any) => {
    try {

        const stateData = state.getState()
        const { currentUser } = getAuth(app)
        const userId = currentUser?.uid
        const userProfile = stateData.file.userProfile;

        if (data != null) {
            const docRef = ref(storage, `userProfile/${userId}`)
            const datas = await list(docRef)
            datas.items[0].fullPath
            const newRef = ref(storage, `${datas.items[0].fullPath}`)
            await deleteObject(newRef)

        }

        const response = await fetch(userProfile);
        const blob = await response.blob();
        const fileName = userProfile.split('/').pop();

        const docRef = ref(storage, `userProfile/${userId}/${fileName}`)

        await uploadBytesResumable(docRef, blob)


    } catch (error) {

        throw error
    }
})


export const getUserPostImage = createAsyncThunk("get/userPostImage", async () => {
    try {
        const { currentUser } = getAuth(app);
        const userId = currentUser?.uid;

        const userFolderRef = ref(storage, `file/${userId}`)
        const userFolder = await list(userFolderRef)

        const files: any[] = [];
        let documents: any[] = []
        for (let folder of userFolder.prefixes) {
            const docRef = ref(storage, `${folder.fullPath}`)
            const docData = await list(docRef)
            let docId = docRef.name;
            for (let data of docData.items) {
                const downLoadRef = ref(storage, `${data.fullPath}`);
                const downLoadUrl = await getDownloadURL(downLoadRef);
                documents.push(downLoadUrl)
            }
            files.push({ documentId: docId, fileUrl: documents })
            documents = []
        }
        return files

    } catch (error) {
        throw error
    }
})



type InitialState = {
    files: string[]
    fileFriendsDatas: any[]
    userProfile: string | null
    userPostImages: any[]
    userPostState: boolean
    friendsIds: any[]
}

const initialState: InitialState = {
    files: [],
    fileFriendsDatas: [],
    userProfile: null,
    userPostImages: [],
    userPostState: true,
    friendsIds: []
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
        },
        profileAdd: (state, action) => {
            state.userProfile = action.payload;
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
            .addCase(getFriendsFiles.pending, (state) => {

            })
            .addCase(getFriendsFiles.fulfilled, (state, action) => {
                state.fileFriendsDatas = action.payload.files
                state.friendsIds = action.payload.friendsIds

            })
            .addCase(getFriendsFiles.rejected, (state, action) => {

            })

            .addCase(getUserPostImage.pending, (state) => {
                state.userPostState = true
            })
            .addCase(getUserPostImage.fulfilled, (state, action) => {
                state.userPostState = false
                state.userPostImages = action.payload

            })
            .addCase(getUserPostImage.rejected, (state, action) => {
                state.userPostState = false
            })
    }
})

export const { imageAdd, imageDelete, profileAdd } = fileSlice.actions
export default fileSlice.reducer