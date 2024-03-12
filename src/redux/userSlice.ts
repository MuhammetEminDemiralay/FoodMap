import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAuth, signInWithEmailAndPassword, User, createUserWithEmailAndPassword} from "firebase/auth";
import app from "../../firebaseConfig";


interface LoginInfo {
    email: string,
    password: string
}

export const login = createAsyncThunk('user/login', async ({ email, password }: LoginInfo) => {
    try {


        const auth = getAuth(app);
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredentials.user;
        const token = await user.getIdToken();

        const userData = {
            token: token,
            user: user
        }

        return userData

    } catch (error) {
        console.log("28.satır", error);
        throw error;
    }
})


const initialState = {
    isAuth: false,
    isLoading: false,
    user: {},
    token: "",
    error: "" as string | undefined
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        // login: (state, action) => { }
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
                state.user = action.payload.user
                state.token = action.payload.token
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isAuth = false;
                state.error = action.error.message
            })
    }
})

// export const { } = userSlice.actions
export default userSlice.reducer