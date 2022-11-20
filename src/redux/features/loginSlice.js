import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user:null
}

const authSlice = createSlice({
    name:"Login",
    initialState,
    reducers:{
        login:(state,action)=>{ 
            console.log("User info");
            state.user = action.payload
        },
        signOutUser:(state)=>{
            state.user = null;
        }
    }
})  

export const {login,signOutUser} = authSlice.actions;
const           authReducer = authSlice.reducer;
export default authReducer;