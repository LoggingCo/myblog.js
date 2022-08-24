import { all, call, fork, takeLatest, throttle, put, delay } from 'redux-saga/effects';
import {
    postCreate,
    postCreateFailure,
    postCreateSuccess,
    postDel,
    postRead,
    postUpdate,
    postDelFailure,
    postReadFailure,
    postReadSuccess,
    postUpdateFailure,
    postUpdateSuccess,
    commentCreate,
    commentDel,
    commentCreateFailure,
    commentCreateSuccess,
    commentDelFailure,
    commentDelSuccess,
} from '@reducer/postReducer';
import PostService from '../services/postService';
import { postDelSuccess, resetPost, resetPostSuccess } from '../reducer/postReducer';

// function

function* addPost(action) {
    try {
        const response = yield call(PostService.prototype.postAdd, action.payload);
        yield delay(500);
        yield put(postCreateSuccess(response));
    } catch (err) {
        yield put(postCreateFailure(new Error('UNKNODW ERROR')));
    }
}

function* readPost(action) {
    try {
        const response = yield call(PostService.prototype.postRead, action.payload);
        yield delay(500);
        yield put(postReadSuccess(response));
    } catch (err) {
        yield put(postReadFailure(new Error('UNKNODW ERROR')));
    }
}

function* updatePost(action) {
    try {
        const response = yield call(PostService.prototype.postUpdate, action.payload);
        yield delay(500);
        yield put(postUpdateSuccess(response));
    } catch (err) {
        yield put(postUpdateFailure(new Error('UNKNODW ERROR')));
    }
}

function* delPost(action) {
    try {
        yield call(PostService.prototype.postDel, action.payload);
        yield delay(500);
        yield put(postDelSuccess(action.payload));
    } catch (err) {
        yield put(postDelFailure(new Error('UNKNODW ERROR')));
    }
}

function* postReset() {
    yield put(resetPostSuccess());
}

function* addComment(action) {
    try {
        const comment = yield call(PostService.prototype.commentAdd, action.payload);
        yield delay(500);
        yield put(commentCreateSuccess(comment));
    } catch (err) {
        yield put(commentCreateFailure(new Error('UNKNODW ERROR')));
    }
}

function* delComment(action) {
    try {
        console.log(action);
        yield call(PostService.prototype.commentDel, action.payload);
        yield delay(500);
        yield put(commentDelSuccess(action.payload));
    } catch (err) {
        yield put(commentDelFailure(new Error('UNKNODW ERROR')));
    }
}

// listner

function* watchPostCreate() {
    yield takeLatest(postCreate.type, addPost);
}

function* watchPostRead() {
    yield throttle(3000, postRead.type, readPost);
}

function* watchPostUpdate() {
    yield takeLatest(postUpdate.type, updatePost);
}

function* watchPostDelete() {
    yield takeLatest(postDel.type, delPost);
}

function* watchPostReset() {
    yield takeLatest(resetPost.type, postReset);
}

function* watchCommentCreate() {
    yield takeLatest(commentCreate.type, addComment);
}

function* watchCommentdel() {
    yield takeLatest(commentDel.type, delComment);
}

// root

export default function* postSaga() {
    yield all([
        fork(watchPostCreate),
        fork(watchPostRead),
        fork(watchPostUpdate),
        fork(watchPostDelete),
        fork(watchCommentCreate),
        fork(watchCommentdel),
        fork(watchPostReset),
    ]);
}
