import { combineReducers } from 'redux';
import { blogReducer } from './blogReducer';
import { chatReducer } from './chatReducer';
import { postReducer } from './postReducer';
import { userReducer } from './userReducer';

export const rootReducer = combineReducers({
    user: userReducer.reducer,
    post: postReducer.reducer,
    blog: blogReducer.reducer,
    chat: chatReducer.reducer,
});
