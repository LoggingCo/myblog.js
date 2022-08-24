import { all, delay, fork, takeLatest, put, call } from 'redux-saga/effects';
import {
    loginUserSuccess,
    loginUserFailure,
    loginUser,
    logOutUser,
    logOutUserSuccess,
    signUser,
    signUserFailure,
    signUserSuccess,
    reLoginUser,
    reLoginUserFailure,
    reLoginUserSuccess,
    infoUpdate,
    infoUpdateFailure,
    infoUpdateSuccess,
} from '@reducer/userReducer';
import TokenService from '@services/toeknService';
import UserService from '@services/userService';

// functtion

function* login(action) {
    try {
        const userInfo = yield call(UserService.prototype.login, action.payload);
        yield delay(500);
        yield TokenService.prototype.set(userInfo.token);
        yield put(loginUserSuccess(userInfo.info));
        yield action.payload.navigate('/');
    } catch (err) {
        yield put(loginUserFailure(new Error('UNKNODW ERROR')));
    }
}

function* reLogin(action) {
    try {
        const userInfo = yield call(UserService.prototype.relogin, action.payload);
        yield delay(500);
        yield put(reLoginUserSuccess(userInfo.info));
    } catch (err) {
        yield put(reLoginUserFailure(new Error('UNKNODW ERROR')));
    }
}

function* logOut(action) {
    try {
        yield call(UserService.prototype.logout, 'test');
        yield delay(500);
        yield put(logOutUserSuccess(action.payload.token));
        yield action.payload.navigate('/login');
    } catch (err) {
        console.log(err);
    } finally {
        TokenService.prototype.delete();
    }
}

function* userSign(action) {
    try {
        yield call(UserService.prototype.sign, action.payload);
        yield delay(500);
        yield put(signUserSuccess());
        if (!alert('회원가입이 완료 되었습니다')) {
            yield action.payload.navigate('/login');
        }
    } catch (err) {
        yield put(signUserFailure(new Error('UNKNODW ERROR')));
    }
}

function* infUpdate(action) {
    try {
        const response = yield call(UserService.prototype.update, action.payload);
        console.log(response);
        yield delay(500);
        yield put(infoUpdateSuccess(response));
    } catch (err) {
        yield put(infoUpdateFailure(new Error('UNKNODW ERROR')));
    }
}

// listner

function* watchLogIn() {
    yield takeLatest(loginUser.type, login);
}

function* watchLeLogin() {
    yield takeLatest(reLoginUser.type, reLogin);
}

function* watchLogOut() {
    yield takeLatest(logOutUser.type, logOut);
}

function* watchUserSign() {
    yield takeLatest(signUser.type, userSign);
}

function* watchInfoUpdate() {
    yield takeLatest(infoUpdate.type, infUpdate);
}

// root

export default function* userSaga() {
    yield all([
        fork(watchLogIn),
        fork(watchLogOut),
        fork(watchUserSign),
        fork(watchLeLogin),
        fork(watchInfoUpdate),
    ]);
}
