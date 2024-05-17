import { configureStore } from "@reduxjs/toolkit";
import postSlice from "./postSlice";
import { thunk } from "redux-thunk"
import fileSlice from "./fileSlice";
import authSlice from "./authSlice";
import userSlice from "./userSlice";



const store = configureStore({
    reducer: {
        auth: authSlice,
        user : userSlice,
        post: postSlice,
        file : fileSlice
    },
    
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })

})

export default store