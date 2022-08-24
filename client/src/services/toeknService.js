export default class TokenService {
    // localStoreag, cookie, axiosheader에 부여하기
    // 사람마다 의견이 다름 가장 좋은 것은 axiosHeader에 부여하고
    // refresh 토큰은 백엔드에서 cookie 값을 설정 서버측 쿠키 값에 저장하여 사용한다

    // 보안이슈
    // 새로고침, 페이지 이동, 로그인 기간 만료 시 해야할 것이 더 생김
    // 하지만 수업을 위해서 로컬스토리지에 저장하는 방법을 택하여 진행

    get() {
        return localStorage.getItem(process.env.REACT_APP_TOKEN_NAME);
    }

    set(token) {
        localStorage.setItem(process.env.REACT_APP_TOKEN_NAME, token);
    }

    delete() {
        localStorage.removeItem(process.env.REACT_APP_TOKEN_NAME);
    }
}
