import { all, call, fork, takeLatest, throttle, put, delay } from 'redux-saga/effects';
import {
    benAdd,
    benAddSuccess,
    benDel,
    benDelSucces,
    benRead,
    benReadListSuccess,
    blogLoad,
    blogLoadSuccess,
    followerDel,
    followerDelSuccess,
    followerRead,
    followerReadSuccess,
    followingAdd,
    followingAddSuccess,
    followingDel,
    followingDelSuccess,
    followingRead,
    followingReadSuccess,
} from '@reducer/blogReducer';
import { blogPostRead, blogPostReadSucces } from '@reducer/postReducer';
import BlogService from '@services/blogService';

// load blog info

function* loadBlog(action) {
    try {
        const response = yield call(BlogService.prototype.loadInfo, action.payload);
        yield delay(1000);
        yield put(blogLoadSuccess(response));
    } catch (err) {
    }
}

// read list

function* readPost(action) {
    try {
        const response = yield call(BlogService.prototype.postRead, action.payload);
        yield delay(500);
        yield put(blogPostReadSucces(response));
    } catch (err) {}
}

function* readFollowing(action) {
    try {
        const response = yield call(BlogService.prototype.followingRead, action.payload);
        yield delay(500);
        yield put(followingReadSuccess(response));
    } catch (err) {}
}

function* readFollower(action) {
    try {
        const response = yield call(BlogService.prototype.followerRead, action.payload);
        yield delay(500);
        yield put(followerReadSuccess(response));
    } catch (err) {}
}

function* readBen(action) {
    try {
        const response = yield call(BlogService.prototype.benRead, action.payload);
        yield delay(500);
        yield put(benReadListSuccess(response));
    } catch (err) {}
}

// ben

function* addBen(action) {
    try {
        const response = yield call(BlogService.prototype.benAdd, action.payload);
        yield delay(500);
        yield put(benAddSuccess(response));
    } catch (err) {}
}

function* delBen(action) {
    try {
        yield call(BlogService.prototype.benDel, action.payload);
        yield delay(500);
        yield put(benDelSucces(action.payload));
    } catch (err) {}
}

// follwing
function* addFollowing(action) {
    try {
        const response = yield call(BlogService.prototype.followingAdd, action.payload);
        yield delay(500);
        yield put(followingAddSuccess(response));
    } catch (err) {}
}

function* delFollowing(action) {
    try {
        yield call(BlogService.prototype.followingDel);
        yield delay(500);
        yield put(followingDelSuccess(action.payload));
    } catch (err) {}
}

// follower

function* delFollower(action) {
    try {
        yield call(BlogService.prototype.followerDel, action.payload);
        yield delay(500);
        yield put(followerDelSuccess(action.payload));
    } catch (err) {}
}

// listner

function* watchBlogload() {
    yield throttle(3000, blogLoad.type, loadBlog);
}

function* watchPostRead() {
    yield throttle(3000, blogPostRead.type, readPost);
}

function* watchFollowingRead() {
    yield throttle(3000, followingRead.type, readFollowing);
}

function* watchFollowerRead() {
    yield throttle(3000, followerRead.type, readFollower);
}

function* watchBenRead() {
    yield throttle(3000, benRead.type, readBen);
}

function* watchAddBen() {
    yield takeLatest(benAdd.type, addBen);
}
function* watchDelBen() {
    yield takeLatest(benDel.type, delBen);
}

function* watchAddFollowing() {
    yield takeLatest(followingAdd.type, addFollowing);
}

function* watchDelFollowing() {
    yield takeLatest(followingDel.type, delFollowing);
}

function* watchDelFollower() {
    yield takeLatest(followerDel.type, delFollower);
}

// root

export default function* blogSaga() {
    yield all([
        fork(watchBlogload),
        fork(watchPostRead),
        fork(watchFollowingRead),
        fork(watchFollowerRead),
        fork(watchBenRead),
        fork(watchAddBen),
        fork(watchDelBen),
        fork(watchAddFollowing),
        fork(watchDelFollowing),
        fork(watchDelFollower),
    ]);
}
