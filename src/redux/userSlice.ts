import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { arrayUnion, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import app, { db, realdb, storage } from "../../firebaseConfig";
import { getAuth } from "firebase/auth";
import { getDownloadURL, list, listAll, ref } from "firebase/storage";



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
        throw error
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
        throw error
    }
})


export const getFriendsProfiles = createAsyncThunk("get/friendsProfile", async (friendsIds: any = null) => {
    try {


        const friendsProfile: any[] = [];
        for (let id of friendsIds) {
            const docRef = doc(db, `users/${id}`)
            const data = (await getDoc(docRef)).data();

            const userProfilRef = ref(storage, `userProfile/${id}`)
            const profileData = await list(userProfilRef)

            let downloadData = ''
            for (let profil of profileData.items) {
                const reff = ref(storage, profil.fullPath)
                const data = await getDownloadURL(reff)
                downloadData = data;
            }

            const newData = Object.assign({}, data, { profileImage: downloadData })
            friendsProfile.push(newData)
        }


        return friendsProfile


    } catch (error) {
        throw error
    }
})

export const getSearchFriends = createAsyncThunk("get/searchFriends", async (characters: string) => {

    try {
        const queryOne = query(collection(db, `users`), where('userInfo.nickName', '==', `${characters}`))

        const datas = await getDocs(queryOne)


        const finalyData: any[] = [];

        for (let docs of datas.docs) {

            const userData = docs.data()

            const docRef = ref(storage, `userProfile/${userData.userId}`)
            const data = await list(docRef)

            for (let da of data.items) {
                const docRef = ref(storage, da.fullPath)
                const downLoadData = await getDownloadURL(docRef)
                const newData = Object.assign({}, userData, { profileImage: downLoadData })
                finalyData.push(newData)
            }
        }



        return finalyData

    } catch (error) {
        throw error
    }
})

interface IntialState {
    userData?: any[];
    currentUser: {}
    friendsProfiles: any[]
    searchFriendProfile: any
}

const initialState: IntialState = {
    userData: [],
    currentUser: {},
    friendsProfiles: [],
    searchFriendProfile: []
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

            .addCase(getFriendsProfiles.pending, (state) => {

            })
            .addCase(getFriendsProfiles.fulfilled, (state, action) => {
                state.friendsProfiles = action.payload;
            })
            .addCase(getFriendsProfiles.rejected, (state, action) => {

            })

            .addCase(getSearchFriends.pending, (state) => {

            })
            .addCase(getSearchFriends.fulfilled, (state, action) => {
                state.searchFriendProfile = action.payload;
            })
            .addCase(getSearchFriends.rejected, (state, action) => {

            })
    }
})

export default userSlice.reducer