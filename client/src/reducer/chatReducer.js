import { createSlice } from '@reduxjs/toolkit';

export const chatReducer = createSlice({
    name: 'user',
    initialState: {
        chatting: null,
        chatList: [],
        isLoading: false,
        isDone: false,
        listLoading: false,
        listDone: false,
        loadLoading: false,
        loadDone: false,
        sendLoading: false,
        sendDone: false,
        resetLoading: false,
        resetDone: false,
        reciveLoading: false,
        reciveDone: false,
        error: null,
    },

    reducers: {
        // load FistChat
        loadChatGuide: (state) => {
            state.isLoading = true;
            state.isDone = false;
            state.error = null;
        },
        loadChatGuideSuccess: (state, action) => {
            state.isLoading = false;
            state.isDone = true;
            state.chatting = action.payload;
        },
        loadChatGuideFailure: (state, action) => {
            state.isLoading = false;
            state.isDone = true;
            state.error = action.error;
        },

        // load ChatList
        loadChatList: (state) => {
            state.listLoading = true;
            state.listDone = false;
            state.error = null;
        },
        loadChatListSuccess: (state, action) => {
            state.listLoading = false;
            state.listDone = true;
            state.chatList = state.chatList.concat(action.payload);
        },
        loadChatListFailure: (state, action) => {
            state.listLoading = false;
            state.listDone = true;
            state.error = action.error;
        },

        // add ChatList
        addChatList: (state) => {
            state.isLoading = true;
            state.isDone = false;
            state.error = null;
        },
        addChatListSuccess: (state, action) => {
            state.isLoading = false;
            state.isDone = true;
            if (action.payload) {
                state.chatList.unshift(action.payload);
            }
        },
        addChatListFailure: (state, action) => {
            state.isLoading = false;
            state.isDone = true;
            state.error = action.error;
        },

        // del ChatList
        delChatList: (state) => {
            state.isLoading = true;
            state.isDone = false;
            state.error = null;
        },
        delChatListSuccess: (state, action) => {
            state.isLoading = false;
            state.isDone = true;
            state.chatList = state.chatList.filter((v) => v.roomIdx !== action.payload);
        },
        delChatListFailure: (state, action) => {
            state.isLoading = false;
            state.isDone = true;
            state.error = action.error;
        },

        // reset ChatList
        resetChatList: (state) => {
            state.resetLoading = true;
            state.resetDone = false;
        },
        resetChatListSuccess: (state) => {
            state.resetLoading = false;
            state.resetDone = true;
            state.chatList = [];
        },

        // load Chat
        loadChat: (state) => {
            state.loadLoading = true;
            state.loadDone = false;
            state.error = null;
        },
        loadChatSuccess: (state, action) => {
            state.loadLoading = false;
            state.loadDone = true;
            state.chatting = action.payload;
        },
        loadChatFailure: (state) => {
            state.loadLoading = true;
            state.loadDone = false;
            state.error = null;
        },

        // send chat
        sendChat: (state) => {
            state.sendLoading = true;
            state.sendDone = false;
            state.error = null;
        },
        sendChatSuccess: (state, action) => {
            state.sendLoading = false;
            state.sendDone = true;
            if (state.chatting.info.roomIdx === action.payload.info.roomIdx) {
                state.chatting.content.push(action.payload.content);
            }
        },
        sendChatFailure: (state, action) => {
            state.sendLoading = false;
            state.sendDone = true;
            state.error = action.error;
        },

        // recive chat
        reciveChat: (state) => {
            state.reciveLoading = false;
            state.reciveDone = true;
            state.error = null;
        },
        reciveChatSuccess: (state, action) => {
            state.reciveLoading = false;
            state.reciveDone = true;
            if (state.chatting.info.roomIdx === action.payload.roomIdx) {
                state.chatting.content.push(action.payload);
            }
        },
        reciveChatFailure: (state, action) => {
            state.reciveLoading = false;
            state.reciveDone = true;
            state.error = action.error;
        },
    },
});

export const {
    loadChatGuide,
    loadChatGuideSuccess,
    loadChatGuideFailure,
    loadChat,
    loadChatSuccess,
    loadChatFailure,
    loadChatList,
    addChatList,
    addChatListSuccess,
    addChatListFailure,
    delChatList,
    delChatListSuccess,
    delChatListFailure,
    resetChatList,
    resetChatListSuccess,
    loadChatListSuccess,
    loadChatListFailure,
    sendChat,
    sendChatSuccess,
    sendChatFailure,
    reciveChat,
    reciveChatSuccess,
    reciveChatFailure,
} = chatReducer.actions;
