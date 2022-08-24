import { createSlice } from '@reduxjs/toolkit';

export const userReducer = createSlice({
    name: 'user',
    initialState: {
        userInfo: null,
        isLoading: false,
        isDone: false,
        error: null,
    },
    reducers: {
        // login
        loginUser: (state) => {
            state.isLoading = true;
            state.isDone = false;
            state.error = null;
        },
        loginUserSuccess: (state, action) => {
            state.isLoading = false;
            state.isDone = true;
            state.userInfo = action.payload;
        },
        loginUserFailure: (state, action) => {
            state.isLoading = false;
            state.isDone = true;
            state.error = action.error;
        },

        // reLogin
        reLoginUser: (state) => {
            state.isLoading = true;
            state.isDone = false;
            state.error = null;
        },
        reLoginUserSuccess: (state, action) => {
            state.isLoading = false;
            state.isDone = true;
            state.userInfo = action.payload;
        },
        reLoginUserFailure: (state, action) => {
            state.isLoading = false;
            state.isDone = true;
            state.error = action.error;
        },

        // logout
        logOutUser: (state) => {
            state.isLoading = true;
            state.isDone = false;
            state.error = null;
        },
        logOutUserSuccess: (state) => {
            state.isLoading = false;
            state.isDone = true;
            state.userInfo = null;
        },

        // sign
        signUser: (state) => {
            state.isLoading = true;
            state.isDone = false;
            state.error = null;
        },
        signUserSuccess: (state) => {
            state.isLoading = false;
            state.isDone = true;
        },
        signUserFailure: (state, action) => {
            state.isLoading = false;
            state.isDone = true;
            state.error = action.error;
        },

        // info Update
        infoUpdate: (state) => {
            state.isLoading = false;
            state.isDone = true;
        },
        infoUpdateSuccess: (state, action) => {
            state.isLoading = false;
            state.isDone = true;
            state.userInfo = action.payload;
        },
        infoUpdateFailure: (state, action) => {
            state.isLoading = false;
            state.isDone = true;
            state.error = action.error;
        },
    },
});

export const {
    loginUser,
    loginUserSuccess,
    loginUserFailure,
    reLoginUser,
    reLoginUserSuccess,
    reLoginUserFailure,
    logOutUser,
    logOutUserSuccess,
    logOutUserFailure,
    signUser,
    signUserSuccess,
    signUserFailure,
    infoUpdate,
    infoUpdateSuccess,
    infoUpdateFailure,
} = userReducer.actions;
