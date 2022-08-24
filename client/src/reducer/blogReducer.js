import { createSlice } from '@reduxjs/toolkit';

export const blogReducer = createSlice({
    name: 'blog',
    initialState: {
        blog: null,
        list: [],
        isLoading: false,
        isDone: false,
        blogLoading: false,
        blogDone: false,
        blogError: null,
        postLoading: false,
        postDone: false,
        postError: null,
        benDone: false,
        benLoading: false,
        benError: null,
        followDone: false,
        followLoading: false,
        followError: null,
        followerDone: false,
        followerLoading: false,
        followerError: null,
        resetLoading: false,
        resetDone: false,
    },
    reducers: {
        // react initialState
        blogLoad: (state) => {
            state.blogLoading = true;
            state.blogDone = false;
            state.blogError = null;
        },
        blogLoadSuccess: (state, action) => {
            state.blogLoading = false;
            state.blogDone = true;
            state.blog = action.payload;
        },
        blogLoadFailure: (state, action) => {
            state.blogLoading = true;
            state.blogDone = false;
            state.blogError = action.payload.error;
        },

        // reset list

        resetList: (state) => {
            state.resetLoading = false;
            state.resetDone = true;
            state.list = [];
        },

        // read following

        followingRead: (state) => {
            state.isLoading = true;
            state.isDone = false;
            state.followerError = null;
        },
        followingReadSuccess: (state, action) => {
            state.isLoading = false;
            state.isDone = true;
            state.list = state.list.concat(action.payload);
        },
        followingReadFailure: (state, action) => {
            state.isLoading = true;
            state.isDone = false;
            state.error = action.payload.error;
        },

        // read follower

        followerRead: (state) => {
            state.isLoading = true;
            state.isDone = false;
            state.error = null;
        },
        followerReadSuccess: (state, action) => {
            state.isLoading = false;
            state.isDone = true;
            state.list = state.list.concat(action.payload);
        },
        followerReadFailure: (state, action) => {
            state.isLoading = true;
            state.isDone = false;
            state.error = action.payload.error;
        },

        // readBen

        benRead: (state) => {
            state.isLoading = true;
            state.isDone = false;
            state.error = null;
        },
        benReadListSuccess: (state, action) => {
            state.isLoading = false;
            state.isDone = true;
            state.list = state.list.concat(action.payload);
        },
        benReadListFailure: (state, action) => {
            state.isLoading = true;
            state.isDone = false;
            state.error = action.payload.error;
        },

        // addben

        benAdd: (state) => {
            state.benLoading = true;
            state.benDone = false;
            state.error = null;
        },
        benAddSuccess: (state) => {
            state.benLoading = false;
            state.benDone = true;
            state.blog.benInfo = 'Y';
            // state.list.unshift(action.payload);
        },
        benAddFailure: (state, action) => {
            state.benLoading = true;
            state.benDone = false;
            state.error = action.payload.error;
        },

        // delben

        benDel: (state) => {
            state.benLoading = true;
            state.benDone = false;
            state.error = null;
        },
        benDelSucces: (state, action) => {
            state.benLoading = false;
            state.benDone = true;
            console.log(state.blog.benInfo);
            state.blog.benInfo = 'N';
            state.list = state.list.filter((v) => v.id !== action.payload);
        },
        benDelFailure: (state, action) => {
            state.benLoading = true;
            state.benDone = false;
            state.error = action.payload.error;
        },

        // addfollowing

        followingAdd: (state) => {
            state.followLoading = true;
            state.followDone = false;
            state.error = null;
        },

        followingAddSuccess: (state) => {
            state.followLoading = false;
            state.followDone = true;
            state.blog.followingInfo = 'Y';
            //state.list.unshift(action.payload);
        },
        followingAddFailure: (state, action) => {
            state.followLoading = true;
            state.followDone = false;
            state.error = action.payload.error;
        },

        // delfollowing

        followingDel: (state) => {
            state.followLoading = true;
            state.followDone = false;
            state.error = null;
        },
        followingDelSuccess: (state) => {
            state.followLoading = false;
            state.followDone = true;
            state.blog.followingInfo = 'N';
            //state.list = state.list.filter((v) => v.id !== action.payload);
        },
        followingDelFailure: (state, action) => {
            state.followLoading = true;
            state.followDone = false;
            state.error = action.payload.error;
        },

        // delfollower
        followerDel: (state) => {
            state.followerLoading = true;
            state.followerDone = false;
            state.error = null;
        },
        followerDelSuccess: (state) => {
            state.followerLoading = false;
            state.followerDone = true;
            //state.list = state.list.filter((v) => v.id !== action.payload);
        },
        followerDelFailure: (state, action) => {
            state.followerLoading = true;
            state.followerDone = false;
            state.error = action.payload.error;
        },
    },
});
export const {
    blogLoad,
    blogLoadSuccess,
    blogLoadFailure,
    resetList,
    followerRead,
    followerReadSuccess,
    followerReadFailure,
    followingRead,
    followingReadSuccess,
    followingReadFailure,
    benRead,
    benReadListSuccess,
    benReadListFailure,
    benAdd,
    benAddFailure,
    benAddSuccess,
    benDel,
    benDelSucces,
    benDelFailure,
    followingAdd,
    followingAddSuccess,
    followingAddFailure,
    followingDel,
    followingDelSuccess,
    followingDelFailure,
    followerDel,
    followerDelSuccess,
    followerDelFailure,
} = blogReducer.actions;
