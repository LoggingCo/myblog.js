import { createSlice } from '@reduxjs/toolkit';

export const postReducer = createSlice({
    name: 'post',
    initialState: {
        post: [],
        isLoading: false,
        isDone: false,
        error: null,
        postDone: false,
        postLoading: false,
        editDone: false,
        editLoading: false,
        commentDone: false,
        commentLoading: false,
        resetDone: false,
        resetLoading: false,
    },
    reducers: {
        // post
        postCreate: (state) => {
            state.postLoading = true;
            state.postDone = false;
            state.error = null;
        },
        postCreateSuccess: (state, action) => {
            state.postLoading = false;
            state.postDone = true;
            state.post.unshift(action.payload);
        },
        postCreateFailure: (state, action) => {
            state.postLoading = false;
            state.postDone = true;
            state.error = action.error;
        },

        postRead: (state) => {
            state.isLoading = true;
            state.isDone = false;
            state.error = null;
        },
        postReadSuccess: (state, action) => {
            state.isLoading = false;
            state.isDone = true;
            state.post = state.post.concat(action.payload);
        },
        postReadFailure: (state, action) => {
            state.isLoading = false;
            state.isDone = true;
            state.error = action.error;
        },
        postUpdate: (state) => {
            state.editLoading = true;
            state.editDone = false;
            state.error = null;
        },

        postUpdateSuccess: (state, action) => {
            state.editLoading = false;
            state.editDone = true;
            let postIndex = state.post.findIndex((v) => v.id === action.payload.id);
            state.post[postIndex] = action.payload;
        },
        postUpdateFailure: (state, action) => {
            state.editLoading = false;
            state.editDone = true;
            state.error = action.error;
        },

        postDel: (state) => {
            state.isLoading = true;
            state.isDone = false;
            state.error = null;
        },
        postDelSuccess: (state, action) => {
            state.isLoading = false;
            state.isDone = true;
            state.post = state.post.filter((v) => v.id !== action.payload);
        },
        postDelFailure: (state, action) => {
            state.isLoading = false;
            state.isDone = true;
            state.error = action.error;
        },

        // post reset
        resetPost: (state) => {
            state.resetLoading = true;
            state.resetDone = false;
        },

        resetPostSuccess: (state) => {
            state.resetLoading = false;
            state.resetDone = true;
            state.post = [];
            state.postLoading = false;
            state.postDone = false;
            state.error = null;
        },

        //comment
        commentCreate: (state) => {
            state.commentLoading = true;
            state.commentDone = false;
            state.error = null;
        },
        commentCreateSuccess: (state, action) => {
            state.commentLoading = false;
            state.commentDone = true;
            const post = state.post.find((v) => v.id === action.payload.postId);
            post.Comments.unshift(action.payload.data);
        },
        commentCreateFailure: (state, action) => {
            state.commentLoading = false;
            state.commentDone = true;
            state.error = action.error;
        },

        commentDel: (state) => {
            state.commentLoading = true;
            state.commentDone = false;
            state.error = null;
        },
        commentDelSuccess: (state, action) => {
            state.commentLoading = false;
            state.commentDone = true;
            const post = state.post.find((v) => v.id === action.payload.postId);
            post.Comments = post.Comments.filter((v) => v.id !== action.payload.commentId);
        },
        commentDelFailure: (state, action) => {
            state.commentLoading = false;
            state.commentDone = true;
            state.error = action.error;
        },

        // blog read post

        blogPostRead: (state) => {
            state.isLoading = true;
            state.isDone = false;
            state.error = null;
        },
        blogPostReadSucces: (state, action) => {
            state.isLoading = false;
            state.isDone = true;
            state.post = state.post.concat(action.payload);
        },
        blogPostReadFailure: (state, action) => {
            state.isLoading = true;
            state.isDone = false;
            state.error = action.payload.error;
        },

        // 게시물
    },
});

export const {
    postCreate,
    postCreateSuccess,
    postCreateFailure,
    postRead,
    postReadSuccess,
    postReadFailure,
    postUpdate,
    postUpdateSuccess,
    postUpdateFailure,
    postDel,
    postDelSuccess,
    postDelFailure,
    resetPost,
    resetPostSuccess,
    commentCreate,
    commentCreateSuccess,
    commentCreateFailure,
    commentDel,
    commentDelSuccess,
    commentDelFailure,
    blogLoadPostSucccess,
    blogPostRead,
    blogPostReadSucces,
    blogPostReadFailure,
} = postReducer.actions;
