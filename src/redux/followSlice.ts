import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllUser } from "./userSlice";
import { get, onValue, push, ref, serverTimestamp, set, update } from "firebase/database";
import app, { realdb } from "../../firebaseConfig";
import { getAuth } from "firebase/auth";
import { FollowRequest } from "../model/followRequest";



// Takip isteği gönder
export const sendFollowRequest = createAsyncThunk("send/followRequest", async (recieverId: string) => {

    try {
        const { currentUser } = getAuth(app);
        const senderId = currentUser?.uid;
        const receiverRef = ref(realdb, `followUser/${recieverId}/${senderId}`)
        await set(receiverRef, {
            isSeen: false,
            requestStatues: false,
            followTo: false,
            time: serverTimestamp(),
        })
    } catch (error) {
        throw error
    }

})

export const updateFollowRequest = createAsyncThunk("update/followReques", async (item: any) => {
    try {
        const { currentUser } = getAuth(app);
        const userId = currentUser?.uid;
        const docRef = ref(realdb, `followUser/${userId}/${item.key}`)

        let newRequestStatues = false;
        if (!(item.value.requestStatues)) {
            newRequestStatues = true;
        }

        await update(docRef, {
            followTo: item?.value.followTo,
            isSeen: item.value.isSeen,
            requestStatues: newRequestStatues,
            time: item?.value.time,
        })
        console.log("update çalıştı");

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



export const unFollowUser = createAsyncThunk("unFollow/user", async () => {

})


//TakipÇİ onay listesini veri ekle
// export const addFollowWatchState = createAsyncThunk("add/followWatchState", async (receiverId: string) => {
//     try {
//         const { currentUser } = getAuth(app);
//         const userId = currentUser?.uid
//         const docRef = ref(realdb, `followWatchState/${userId}`)
//         push(docRef, {
//             receiverId: receiverId,
//             wathcState: true
//         })

//     } catch (error) {
//         throw error
//     }
// })

// // TakipÇİ onay listesini çek
// export const listFollowWatchState = createAsyncThunk("check/followWatchState", async () => {
//     try {
//         const { currentUser } = getAuth(app);
//         const userId = currentUser?.uid;

//         const docRef = ref(realdb, `followeWatchState/${userId}`)
//         const data = await get(docRef);
//         data.forEach(item => console.log(item.val()))


//     } catch (error) {

//     }
// })

// Takip edilenler listesine ekle
// Takip edilenler listesi - following list
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