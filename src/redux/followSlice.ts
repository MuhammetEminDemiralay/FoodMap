import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllUser } from "./userSlice";
import { get, onValue, push, ref, serverTimestamp, set, update } from "firebase/database";
import app, { realdb } from "../../firebaseConfig";
import { getAuth } from "firebase/auth";
import { FollowRequest } from "../model/followRequest";



// Takip isteği gönder
export const sendFollowRequest = createAsyncThunk("send/followRequest", async (item: any) => {

    try {
        console.log(item);

        const { currentUser } = getAuth(app);
        const senderId = currentUser?.uid;
        const receiverRef = ref(realdb, `followUser/${item}/${senderId}`)
        console.log(item.key);


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

// Takibi onaylama işlemi
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


// TAKİP İSTEKLERİNİ GETİR
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

                dispatch(userRequest(result.reverse()))
            }, (error) => {
                reject(error);
            });
        });


        console.log("Dış", data);

        return data


    } catch (error) {
        throw error
    }
})




export const addToFollowingList = createAsyncThunk("add/toFollowingList", async (followerId: any) => {
    try {
        const { currentUser } = getAuth(app);
        const userId = currentUser?.uid;
        const docRef = ref(realdb, `followingList/${followerId}/${userId}`);

        await set(docRef, {
            profileId: userId,
            time: serverTimestamp()
        })


    } catch (error) {

    }
})

// Takipçi listesine ekle -- add to follower list
// Takipçi listesi -- follower list
export const addToFollowerList = createAsyncThunk("add/toFollowerList", async (followerId: any) => {
    try {
        const { currentUser } = getAuth(app);
        const userId = currentUser?.uid;
        const docRef = ref(realdb, `followerList/${userId}/${followerId}`);

        await set(docRef, {
            profileId: followerId,
            time: serverTimestamp()
        })


    } catch (error) {

    }
})

interface InitialState {
    userData: any[],
    userRequests: any[]
}

const initialState: InitialState = {
    userData: [],
    userRequests: []
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

            // get user follow
            .addCase(getFollowerRequest.pending, (state) => {

            })
            .addCase(getFollowerRequest.fulfilled, (state, action) => {
                state.userRequests = action.payload
            })
            .addCase(getFollowerRequest.rejected, (state, action) => {

            })
    }
})

export const { userRequest } = followSlice.actions;

export default followSlice.reducer