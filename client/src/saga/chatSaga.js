import { all, delay, fork, takeLatest, put, call, throttle } from 'redux-saga/effects';
import {
    loadChat,
    loadChatFailure,
    loadChatGuide,
    loadChatGuideFailure,
    loadChatGuideSuccess,
    loadChatList,
    loadChatListFailure,
    loadChatListSuccess,
    loadChatSuccess,
    reciveChat,
    reciveChatFailure,
    reciveChatSuccess,
    sendChat,
    sendChatFailure,
    sendChatSuccess,
    addChatList,
    addChatListFailure,
    addChatListSuccess,
    delChatList,
    delChatListFailure,
    delChatListSuccess,
    resetChatList,
    resetChatListSuccess,
} from '@reducer/chatReducer';
import ChatService from '@services/chatService';

// functtion
function* chatGiude() {
    try {
        const response = yield call(ChatService.prototype.load);
        yield delay(500);
        yield put(loadChatGuideSuccess(response));
    } catch (err) {
        yield put(loadChatGuideFailure(new Error(err)));
    }
}

function* chatLoad(action) {
    try {
        const response = yield call(ChatService.prototype.loadChat, action.payload);
        yield delay(500);
        yield put(loadChatSuccess(response));
    } catch (err) {
        yield put(loadChatFailure(new Error(err)));
    }
}

function* chatList(action) {
    try {
        const response = yield call(ChatService.prototype.loadList, action.payload);
        yield delay(500);
        yield put(loadChatListSuccess(response));
    } catch (err) {
        yield put(loadChatListFailure(new Error(err)));
    }
}

function* chatAdd(action) {
    try {
        yield call(ChatService.prototype.addList, action.payload);
        yield put(addChatListSuccess());
        yield action.payload.navigate('/chat');
    } catch (err) {
        yield put(addChatListFailure(new Error(err)));
    }
}

function* chatDel(action) {
    try {
        yield call(ChatService.prototype.delList, action.payload);
        yield put(delChatListSuccess(action.payload));
    } catch (err) {
        yield put(delChatListFailure(new Error(err)));
    }
}

function* resetChat() {
    yield put(resetChatListSuccess());
}

// 내가 보낼 때 채팅 내역 저장

function* chatSend(action) {
    try {
        yield call(ChatService.prototype.send, action.payload);
        yield delay(500);
        yield put(sendChatSuccess(action.payload));
    } catch (err) {
        yield put(sendChatFailure(new Error(err)));
    }
}

// 보낼 때 저장 됐으므로 받을 때 다시 저장할 필요는 없음
// 그러나 내 채팅 리스트에 없는 새로운 사람 일경우 채팅 리스트에 값을 추가해야함
// 차단 된 사용자라면 에러 발생

function* chatRecive(action) {
    try {
        const response = yield call(ChatService.prototype.recive, action.payload);
        if (response.info) {
            const userInfo = yield call(ChatService.prototype.add, response.info);
            yield put(addChatListSuccess(userInfo));
        } else {
            yield put(reciveChatSuccess(response.content));
        }
    } catch (err) {
        yield put(reciveChatFailure(new Error(err)));
    }
}

// listner

function* watchChatGiude() {
    yield takeLatest(loadChatGuide.type, chatGiude);
}

function* watchChatLoad() {
    yield takeLatest(loadChat.type, chatLoad);
}

function* watchChatList() {
    yield throttle(3000, loadChatList.type, chatList);
}

function* watchAddChatList() {
    yield takeLatest(addChatList.type, chatAdd);
}

function* watchDelChatList() {
    yield takeLatest(delChatList.type, chatDel);
}

function* watchResetChat() {
    yield takeLatest(resetChatList.type, resetChat);
}

function* watchChatSend() {
    yield takeLatest(sendChat.type, chatSend);
}

function* watchChatRecive() {
    yield takeLatest(reciveChat.type, chatRecive);
}

// root

export default function* chatSaga() {
    yield all([
        fork(watchChatGiude),
        fork(watchChatLoad),
        fork(watchChatList),
        fork(watchResetChat),
        fork(watchChatSend),
        fork(watchChatRecive),
        fork(watchAddChatList),
        fork(watchDelChatList),
    ]);
}
