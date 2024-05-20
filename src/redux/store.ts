import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk"
import postSlice from "./postSlice";
import fileSlice from "./fileSlice";
import authSlice from "./authSlice";
import userSlice from "./userSlice";
import followSlice from "./followSlice";


const store = configureStore({
    reducer: {
        auth: authSlice,
        user: userSlice,
        post: postSlice,
        file: fileSlice,
        follow: followSlice
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })

})

export default store