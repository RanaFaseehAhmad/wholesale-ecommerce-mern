import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
};
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload

        },
        logOut: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.loading = false
        },
        initializeAuth: (state, action) => {
            state.isAuthenticated = true;
            state.loading = false;
            state.user = action.payload
        }

    }

});
export const { loginStart, loginSuccess, logOut, initializeAuth } = authSlice.actions;
export default authSlice.reducer;