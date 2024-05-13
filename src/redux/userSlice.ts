import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Login } from "../model/login";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithCredential, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import app, { db } from "../../firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where, orderBy, collectionGroup } from "firebase/firestore";


export type UserInfo = {
    email: string,
    password: string,
}


GoogleSignin.configure({
    webClientId: '579135765667-8aqu70foqqvmhu22edbli1u29dd4m1ji.apps.googleusercontent.com',
    forceCodeForRefreshToken: true,
});


export const addData: any = createAsyncThunk("user/add", async () => {
    try {
        const addedData = await addDoc(collection(db, "userExtrad2"), {
            id: 2,
            firstName: "AYSENUR",
            lastName: "Demiralay",
            year: 25
        })
        console.log("Veri eklendi", addedData.id);

    } catch (error) {
        console.log("Eklemede hata oldu");

        throw error;
    }
})

export const setData: any = createAsyncThunk("user/setData", async () => {
})

export const deleteData: any = createAsyncThunk("user/delete", async () => {
    const docRef = doc(db, "userExtrad", "aacEpnnEYUyClEeAbqk0");

    await deleteDoc(docRef);
})

export const updateData: any = createAsyncThunk("user/delete", async () => {
    const docRef = doc(db, "userExtrad", "No2gzAvn6x2vqvrsZlUO");
    await updateDoc(docRef, {
        year: 28
    })
})

export const getData: any = createAsyncThunk("user/getData", async () => {
    const getData = await getDoc(doc(db, "userExtrad", "YPiPaQasNOIgtoa6rM1f"))

})

export const getAllData: any = createAsyncThunk("user/getAllData", async () => {
    const getAllData = await getDocs(collection(db, "userExtrad"))

    console.log(getAllData.forEach(veri => console.log(veri.data())));
})

export const getQueryData: any = createAsyncThunk("user/query", async () => {
    const queryResult = await query(collection(db, "userExtrad"), where("year", "<", 26), orderBy("name",));
    const data = await getDocs(queryResult);
    data.forEach(doc => console.log(doc.data()));
})

// export const multiSorgu: any = createAsyncThunk("user/multiQuery", async () => {
//     // const queryResult = await query()
//     const datas = await getDocs(collectionGroup(db,"userExtra"));
//     datas.forEach(doc => console.log(doc.data()))

// })



// REGİSTER
export const register: any = createAsyncThunk("user/register", async ({ email, password }: UserInfo) => {
    try {
        const auth = getAuth(app);
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const token = await user.getIdToken();
        const userData = {
            token,
            user: user,
        }

        const userEmail = user.email;

        if (userEmail) {
            await sendPasswordResetEmail(auth, userEmail);
        }

        return userData

    } catch (error) {
        throw error;
    }
})

// LOGİN
export const login: any = createAsyncThunk("user/login", async ({ email, password }: UserInfo) => {
    try {
        const auth = getAuth(app);
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const token = await user.getIdToken();
        const userData = {
            token,
            user: user
        }
        await AsyncStorage.setItem("_userToken", token);
        await AsyncStorage.setItem("_uid", userCredential.user.uid);
        return userData;
    } catch (error) {
        console.log("userSlice 26. satır");
        throw error
    }
})


//AUTO_LOGİN
export const autoLogin = createAsyncThunk("user/autoLogin", async () => {
    try {
        const token = await AsyncStorage.getItem("_userToken");
        const uid = await AsyncStorage.getItem("_uid");
        if (token) {
            const data = {
                uid: uid,
                token: token
            }

            return data;
        } else {
            throw new Error("user not found");
        }
    } catch (error) {
        throw error;
    }
})

// LOG_OUT
export const logout: any = createAsyncThunk("user/logout", async () => {
    try {
        const auth = getAuth(app);
        await signOut(auth);
        await AsyncStorage.removeItem("_userToken");
        await AsyncStorage.removeItem("_uid")
        return null;
    } catch (error) {
        throw error;
    }
})


// GOOGLE_SİGNİN
export const googleSignin = createAsyncThunk("user/googleSignin", async () => {

    const auth = getAuth(app);

    try {
        const currentUser = await GoogleSignin.getCurrentUser();
        if (currentUser != null) {
            try {
                await GoogleSignin.signOut();
                console.log("çıkış yaptı");
            } catch (error) {
                console.error(error);
            }
        }
        await GoogleSignin.hasPlayServices();
        const { idToken } = await GoogleSignin.signIn();

        const googleCredentials = GoogleAuthProvider.credential(idToken)           // Bizim eklediklerimiz //idToken sayesinde id ile giriş yap sağlıyıruz

        const data = await signInWithCredential(auth, googleCredentials);
        await AsyncStorage.setItem("_uid", data.user.uid);
        if (googleCredentials.idToken) {
            await AsyncStorage.setItem("_userToken", googleCredentials.idToken);
            const data = {
                uid : await AsyncStorage.getItem("_uid"),
                result : true
            }

            return data;
        } else {
            const data = {
                uid : null,
                result : false
            }
            return data;
        }


    } catch (error: any) {

        console.log("google signing error", error);

        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            console.log("user cancelled the login flow");

        } else if (error.code === statusCodes.IN_PROGRESS) {
            console.log("operation (e.g. sign in) is in progress already");
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            console.log("play services not available or outdated");

        } else {
            console.log("some other error happened");

        }
    }

})

export type User = {
    isLoading: boolean,
    isAuth? : boolean,
    token: string | null,
    user: {},
    error?: string,
    displayName: null,
    uid?: string | null
}

const initialState: User = {
    isLoading: false,
    isAuth: false,
    token: "",
    user: {},
    displayName: null,
    uid: ""
}


export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.isAuth = false;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuth = true;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.uid = action.payload.user.uid;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isAuth = false;
                state.error = action.error.code;
            })


            .addCase(autoLogin.pending, (state) => {
                state.isLoading = true;
                state.isAuth = false;
            })
            .addCase(autoLogin.fulfilled, (state, action) => {
                state.isLoading = true;
                state.isAuth = true;
                state.token = action.payload.token;
                state.uid = action.payload.uid
            })
            .addCase(autoLogin.rejected, (state, action) => {
                state.isLoading = false;
                state.isAuth = false;
                state.token = "";
                state.error = action.error.code;
            })


            .addCase(register.pending, (state) => {
                state.isLoading = true;
                state.isAuth = false;
            })
            .addCase(register.fulfilled, (state: any = initialState, action) => {
                state.isLoading = false;
                state.isAuth = true;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(register.rejected, (state: any = initialState, action) => {
                state.isLoading = false;
                state.isAuth = false;
                state.error = action.error.code;
            })

            .addCase(logout.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logout.fulfilled, (state) => {
                state.isLoading = false;
                state.isAuth = false;
                state.token = null;
                state.uid = null;
            })
            .addCase(logout.rejected, (state: any = initialState, action) => {
                state.isLoading = false;
                state.error = action.error.code;
            })


            .addCase(googleSignin.pending, (state) => {
                state.isLoading = true;
                state.isAuth = false;
            })
            .addCase(googleSignin.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuth = action.payload?.result;
                state.uid = action.payload?.uid
            })
            .addCase(googleSignin.rejected, (state, action) => {
                state.isLoading = false;
                state.isAuth = false;
                state.error = action.error.code
            })
    }
})


export default userSlice.reducer
