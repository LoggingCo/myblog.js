import { blogBen, blogDATA, blogFollower, blogFollowing, blogInfo, listDummy } from '@util/data';

export default class BlogService {
    loadInfo(req) {
        console.log(req);
        const response = blogInfo;
        return response;
    }

    postRead(req) {
        console.log(req);
        const response = blogDATA(10);
        return response;
    }

    followingRead(req) {
        console.log(req);
        const response = blogFollowing(10);
        return response;
    }

    followerRead(req) {
        console.log(req);
        const response = blogFollower(10);
        return response;
    }

    benRead(req) {
        console.log(req);
        const response = blogBen(10);
        return response;
    }

    benAdd(req) {
        console.log(req);
        const response = listDummy();
        return response;
    }

    benDel(req) {
        console.log(req);
        console.log('삭제 성공');
    }

    followingAdd(req) {
        console.log(req);
        const response = listDummy();
        return response;
    }

    followingDel(req) {
        console.log(req);
        console.log('삭제 성공');
    }

    followerDel(req) {
        console.log(req);
        console.log('삭제 성공');
    }
}
