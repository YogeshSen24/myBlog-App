import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false,
    userData : {},
}

const authSlice = createSlice({
    name : "auth",
    initialState ,
    reducers : {
        login : (state , action)=>{
            state.status = true
            state.userData = action.payload.data
            // console.log(action.payload.data);
        },
        logout : (state)=>{
            state.status = false
            state.userData = null
        }
    }
})
export const {login , logout} = authSlice.actions
export default authSlice.reducer