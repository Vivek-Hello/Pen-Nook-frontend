import { configureStore } from "@reduxjs/toolkit"
import authReducer from './authReducer.js'
import blogReducer from './blogReducer.js'
const store =configureStore({
    reducer:{
        auth:authReducer,
        blog:blogReducer,
    }
})

export default store