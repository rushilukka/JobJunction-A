import { createSlice } from "@reduxjs/toolkit";

// this will be avaliable globally so we don't have to pass down property to components 
const initialState = {
    mode: "dark",
    user: null,
    token: null,
    posts: [],
};
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
    },
});

export const { setMode, setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;