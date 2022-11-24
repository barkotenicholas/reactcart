import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: sessionStorage.getItem("user") ?
        JSON.parse(sessionStorage.getItem("user")) :
        null
}

const authSlice = createSlice({
    name: "Login",
    initialState,
    reducers: {
        login: (state, action) => {
            console.log("User info");
            state.user = action.payload
            sessionStorage.setItem("user", JSON.stringify(action.payload));

        },
        signOutUser: (state) => {
            console.log(`removing users`);
            sessionStorage.removeItem("user")
            state.user = null;

        }
    }
})

export const { login, signOutUser } = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;