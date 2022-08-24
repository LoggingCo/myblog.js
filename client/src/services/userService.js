import { userDATA, userUpdateInfo } from '@util/data';

export default class UserService {
    login(req) {
        console.log(req);
        const response = userDATA();
        return response;
    }

    relogin(req) {
        const response = req;
        return response;
    }

    logout(token) {
        console.log(token);
        console.log('로그아웃 성공');
    }

    sign(req) {
        console.log(req);
        console.log('회원가입 성공');
    }

    update(req) {
        console.log(req);
        const response = userUpdateInfo;
        return response;
    }
}
