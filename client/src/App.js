import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import MainPage from '@pages/mainPage';
import LoginPage from '@pages/loginPage';
import SignPage from '@pages/signPage/';
import BlogPage from '@pages/blogPage/';
import ChatPage from '@pages/chatPage/';
import GlobalStyle from '@style/global';
import { useEffect } from 'react';
import TokenService from './services/toeknService';
import PrivateRoute from './util/privateRoute';
import { useSelector } from 'react-redux';
import NotFountPage from '@common/error/404';
import MobilChatPage from './pages/chatPage/mobile';
// import { useDispatch } from "react-redux";
// import { reLoginUser } from "./reducer/userReducer";

function App() {
    // const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.user);

    useEffect(() => {
        const token = TokenService.prototype.get();
        if (token) {
            // dispatch(reLoginUser(token));
            // 다시 로그인, 기존 토큰을 그대로 전송 로그인 정보 받아옴
            // 세션 만료시간 초기화
            // 토큰 30분 후 삭제, 토큰 만료 시 랜더링 발생
            // refreshToken 전달 새로운 토큰 발급
            // 단, refreshToken은 서버에서 쿠키로 저장하여 헤더에 전달
            // 실제로 인증으로 사용될 accessToken은 axios header에 값을 전달
        }
    }, []);

    return (
        <BrowserRouter>
            <GlobalStyle />
            <Routes>
                <Route path={'/login'} element={<LoginPage />} />
                <Route path={'/sign'} element={<SignPage />} />
                <Route element={<PrivateRoute auth={userInfo} />}>
                    <Route path={'/'} element={<MainPage />} />
                    <Route path={'/blog/:blogIdx'} element={<BlogPage />} />
                    <Route path={'/chat'} element={<ChatPage />} />
                    <Route path={'/chat/:roomIdx'} element={<MobilChatPage />} />
                </Route>
                <Route path={'/*'} element={<NotFountPage />} />
            </Routes>
        </BrowserRouter>
    );
}
export default App;
