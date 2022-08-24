import { chatListDummy, chatDummy, chatFirstDummy } from '@util/data';
import { chatListData } from '../util/data';

export default class ChatService {
    load() {
        const response = chatFirstDummy();
        return response;
    }

    loadList(req) {
        console.log(req);
        const response = chatListData(10);
        return response;
    }

    loadChat(req) {
        console.log(req);
        const response = chatDummy();
        return response;
    }

    addList(req) {
        console.log(req);
        const response = chatDummy();
        return response;
    }

    delList(req) {
        console.log(req);
        console.log('삭제 성공');
    }

    send(req) {
        console.log(req);
        console.log('송신 내역 저장 성공');
    }

    recive(req) {
        console.log(req);
        const response = chatListDummy();
        return response;
    }
}
