import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import postSlice from "./postSlice";
import { thunk } from "redux-thunk"
import fileSlice from "./fileSlice";


const store = configureStore({
    reducer: {
        user: userSlice,
        post: postSlice,
        file : fileSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })

})

export default store