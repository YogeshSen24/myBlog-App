import {configureStore} from '@reduxjs/toolkit'
import authSlice from './authSlice';
import postSlice from './postSlice';



const store = configureStore({
    reducer: authSlice,
    post : postSlice,
});

export default store