import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOutUser } from '@reducer/userReducer';
import { HeaderWrapper, HeaderLogo, HeaderList, HeaderContent } from './style';
import { Link } from 'react-router-dom';
import TokenService from '@services/toeknService';
import HeaderSearch from './search';
import { useMedia } from '@hooks/useMedia';

const LayOutHeader = () => {
    // media qurey
    const { isPc } = useMedia();

    // util
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // state
    const userInfo = useSelector((state) => state.user.userInfo);

    // logout dispatch

    const onLogOuthandler = useCallback(() => {
        dispatch(
            logOutUser({
                token: TokenService.prototype.get(),
                navigate: navigate,
            }),
        );
    }, [dispatch, navigate]);

    // html

    return (
        <HeaderWrapper>
            <HeaderContent>
                <Link to="/">
                    <HeaderLogo>myBlog</HeaderLogo>
                </Link>
                {isPc && userInfo && <HeaderSearch />}
                <HeaderList>
                    {userInfo ? (
                        <>
                            <Link to={`/blog/${userInfo.blogIdx}`}>
                                <li>마이블로그</li>
                            </Link>
                            <Link to="/chat">
                                <li>채팅</li>
                            </Link>
                            <li onClick={onLogOuthandler}>로그아웃</li>
                        </>
                    ) : (
                        <>
                            <Link to="/sign">
                                <li>회원가입</li>
                            </Link>
                            <Link to="/login">
                                <li>로그인</li>
                            </Link>
                        </>
                    )}
                </HeaderList>
            </HeaderContent>
            {!isPc && userInfo && <HeaderSearch />}
        </HeaderWrapper>
    );
};
export default LayOutHeader;
