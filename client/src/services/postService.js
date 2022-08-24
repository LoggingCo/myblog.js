import { commentDummy, postDATA, postDummy } from '../util/data';

export default class PostService {
    postAdd(req) {
        const response = postDummy(req);
        return response;
    }

    postRead(req) {
        console.log(req);
        const response = postDATA(10);
        return response;
    }

    postUpdate(req) {
        const response = postDummy(req);
        return response;
    }

    postDel(req) {
        console.log(req);
        console.log('삭제 성공');
    }

    commentAdd(req) {
        console.log(req);
        const response = {
            postId: req.postId,
            data: commentDummy(req.content),
        };
        return response;
    }

    commentDel(req) {
        console.log(req);
        console.log('삭제 성공');
    }
}
