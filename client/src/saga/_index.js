import { all, fork } from 'redux-saga/effects';
import blogSaga from './blogSaga';
import chatSaga from './chatSaga';
import postSaga from './postSaga';
import userSaga from './userSaga';

export default function* rootSaga() {
    yield all([fork(userSaga), fork(postSaga), fork(blogSaga), fork(chatSaga)]);
}
