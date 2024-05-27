import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllUser } from "./userSlice";
import { get, onValue, push, ref, serverTimestamp, set, update, remove } from "firebase/database";
import app, { realdb } from "../../firebaseConfig";
import { getAuth } from "firebase/auth";
import { doc } from "firebase/firestore";



// Takip isteği gönderme
export const sendFollowRequest = createAsyncThunk("send/followRequest", async (item: any) => {

    try {
        const { currentUser } = getAuth(app);
        const senderId = currentUser?.uid;
        const receiverRef = ref(realdb, `followUser/${item}/${senderId}`)

        const senderRef = ref(realdb, `followUser/${senderId}/${item}`)

        let newRequestStatus = false;
        let newFollowStatus = false;
        let newStandByStatus = false;

        const data = (await get(senderRef)).val();
        if (data?.requestStatus) {
            await update(senderRef, {
                followTo: true,
            })
        }

        await set(receiverRef, {
            isSeen: false,
            requestStatus: newRequestStatus,
            followTo: newFollowStatus,
            standByStatus: newStandByStatus,
            time: serverTimestamp(),
        })

    } catch (error) {
        throw error
    }
})


// Takip isteği onaylama
export const confirmFollowRequestStatus = createAsyncThunk("update/followReques", async (item: any) => {
    try {
        const { currentUser } = getAuth(app);
        const userId = currentUser?.uid;
        const senderRef = ref(realdb, `followUser/${userId}/${item.key}`)
        const senderData = (await get(senderRef)).val();

        const receiverRef = ref(realdb, `followUser/${item.key}/${userId}`)
        const receiverData = (await get(receiverRef)).val();

        if (receiverData?.followTo) {
            await update(senderRef, {
                followTo: true
            })
        }

        await update(senderRef, {
            requestStatus: true
        })

        if (receiverData?.followTo) {
            await update(receiverRef, {
                standByStatus: true
            })
            await update(senderRef, {
                standByStatus: true
            })
        }
    } catch (error) {
        throw error
    }
})


// Takip isteğini getirme
export const getFollowerRequest = createAsyncThunk("get/followRequest", async (a, { dispatch, abort, extra, fulfillWithValue, getState, rejectWithValue, requestId, signal }) => {
    try {
        const { currentUser } = getAuth(app);
        const userId = currentUser?.uid;
        const docRef = ref(realdb, `followUser/${userId}`)

        const data: any = await new Promise((resolve, reject) => {
            onValue(docRef, (snapshot) => {
                const value = snapshot.val();
                const result: any = [];
                if (value) {
                    Object.keys(value).forEach((key) => {
                        result.push({ key: key, value: value[key] });
                    });
                }
                dispatch(userRequest(result))
            }, (error) => {
                reject(error);
            });
        });

        return data
    } catch (error) {
        throw error
    }
})

// Takipçi listesine ekleme
export const addToFollowerList = createAsyncThunk("add/followerList", async (followerId: any) => {
    try {
        const { currentUser } = getAuth(app);
        const userId = currentUser?.uid;
        const docRef = ref(realdb, `followerList/${userId}/${followerId}`);
        await set(docRef, {
            profileId: followerId,
            time: serverTimestamp()
        })

    } catch (error) {
        throw error
    }
})

// Takip edilen listesine ekleme
export const addToFollowedList = createAsyncThunk("add/followedList", async (followerId: any) => {
    try {
        const { currentUser } = getAuth(app);
        const userId = currentUser?.uid;
        const docRef = ref(realdb, `followedList/${followerId}/${userId}`);

        await set(docRef, {
            profileId: userId,
            time: serverTimestamp()
        })

    } catch (error) {
        throw error
    }
})

// Takipçi listesini getir
export const getFollowerList = createAsyncThunk("get/followerList", async () => {
    try {
        const { currentUser } = getAuth(app);
        const userId = currentUser?.uid;
        const docRef = ref(realdb, `followerList/${userId}`)
        const value = (await get(docRef)).val();
        let keys: any[] = [];
        if (value == null) {
            keys = [];
        } else {
            Object.keys(value).forEach(key => {
                keys.push(key);
            })
        }
        const data = {
            keys: keys,
            size: keys.length
        }

        return data
    } catch (error) {
        throw error
    }
})


// Takip edilenler listesini getir
export const getFollowedList = createAsyncThunk("get/followedList", async () => {
    try {
        const { currentUser } = getAuth(app);
        const userId = currentUser?.uid;
        const docRef = ref(realdb, `followedList/${userId}`)
        const value = (await get(docRef)).val();
        let keys: any[] = [];
        if (value == null) {
            keys = [];
        } else {
            Object.keys(value).forEach(key => {
                keys.push(key)
            })
        }
        const data = {
            keys: keys,
            size: keys.length
        }

        return data
    } catch (error) {
        throw error
    }
})

// Takipçi listesinden sil
export const removeFolowerList = createAsyncThunk("remove/follewerList", async (item: string) => {
    try {
        const { currentUser } = getAuth(app);
        const userId = currentUser?.uid;
        const senderFollowerRefList = ref(realdb, `followerList/${userId}/${item}`)
        const receiverFollowedRefList = ref(realdb, `followedList/${item}/${userId}`)
        const senderFollowRefRequest = ref(realdb, `followUser/${userId}/${item}`)

        await remove(senderFollowerRefList)
        await remove(receiverFollowedRefList)

    } catch (error) {
        throw error
    }
})




// Takip edilenler listesinden sil
export const removeFolowedList = createAsyncThunk("remove/follewedList", async (item: string) => {
    try {
        const { currentUser } = getAuth(app);
        const userId = currentUser?.uid;
        const receiverFollowerRefList = ref(realdb, `followerList/${item}/${userId}`)
        const senderFollowedRefList = ref(realdb, `followedList/${userId}/${item}`)
        const receiverFollowRefRequest = ref(realdb, `followUser/${item}/${userId}`)

        await remove(receiverFollowerRefList);
        await remove(senderFollowedRefList);
        // await remove(receiverFollowRefRequest);
    } catch (error) {
        throw error
    }
})


export const updateFollowerRequest = createAsyncThunk("update/followerRequest", async (item: any) => {
    try {
        const { currentUser } = getAuth(app);
        const userId = currentUser?.uid;

        const senderRef = ref(realdb, `followUser/${userId}/${item}`)
        const receiverRef = ref(realdb, `followUser/${item}`)
        const senderfollowerRefList = ref(realdb, `followerList/${userId}/${item}`)
        const receiverFollowedRefList = ref(realdb, `followedList/${item}/${userId}`)

        await update(senderRef, {
            followTo: false,
            standByStatus: false
        })
        await remove(receiverRef);
        await remove(senderfollowerRefList);
        await remove(receiverFollowedRefList);

    } catch (error) {
        throw error
    }
})

interface InitialState {
    userData: any[],
    userRequests: any[],
    followerList: any[],
    followedList: any[],
    followerSize: number,
    followedSize: number
}

const initialState: InitialState = {
    userData: [],
    userRequests: [],
    followerList: [],
    followedList: [],
    followerSize: 0,
    followedSize: 0
}

const followSlice = createSlice({
    name: "follow",
    initialState,
    reducers: {
        userRequest(state, action) {
            state.userRequests = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllUser.pending, (state) => {

            })
            .addCase(getAllUser.fulfilled, (state, action) => {

            })
            .addCase(getAllUser.rejected, (state, action) => {

            })

            .addCase(getFollowerRequest.pending, (state) => {

            })
            .addCase(getFollowerRequest.fulfilled, (state, action) => {
                state.userRequests = action.payload
            })
            .addCase(getFollowerRequest.rejected, (state, action) => {

            })

            .addCase(getFollowerList.pending, (state) => {

            })
            .addCase(getFollowerList.fulfilled, (state, action) => {
                state.followerList = action.payload.keys;
                state.followerSize = action.payload.size;
            })
            .addCase(getFollowerList.rejected, (state, action) => {

            })

            .addCase(getFollowedList.pending, (state) => {

            })
            .addCase(getFollowedList.fulfilled, (state, action) => {
                state.followedList = action.payload.keys;
                state.followedSize = action.payload.size;
            })
            .addCase(getFollowedList.rejected, (state, action) => {

            })

    }
})

export const { userRequest } = followSlice.actions;

export default followSlice.reducer