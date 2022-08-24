import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '@reducer/userReducer';
import CommonButton from '@components/_common/buttonForm';
import { LoginFormLogo } from './style';
import { useNavigate } from 'react-router-dom';
import { useInput } from '@hooks/useInput';
import { encrypt } from '@util/crypto';

const LoginTampLate = () => {
    // util
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // state hook
    const [email, onChangEmail] = useInput('');
    const [password, onChangPassword] = useInput('');

    // login dispatch
    const onLoginHandler = useCallback(
        (e) => {
            e.preventDefault();
            const crtyptoPassword = encrypt(password, process.env.REACT_APP_USER_KEY);
            dispatch(
                loginUser({
                    email: email,
                    pw: crtyptoPassword,
                    navigate: navigate,
                }),
            );
        },
        [dispatch, navigate],
    );

    // html

    return (
        <>
            <LoginFormLogo>myBlog</LoginFormLogo>
            <p>
                이메일
                <input
                    type="text"
                    placeholder="이메일을 입력해주세요"
                    value={email}
                    onChange={onChangEmail}
                    autoComplete="off"
                />
            </p>
            <p>
                비밀번호
                <input
                    type="password"
                    placeholder="비밀번호를 입력해주세요"
                    value={password}
                    onChange={onChangPassword}
                    autoComplete="off"
                />
            </p>
            <CommonButton
                type="normal"
                size="full"
                height="2rem"
                fontSize="0.825rem"
                margin="1rem 0 0.5rem 0"
                onClick={onLoginHandler}
            >
                이메일로 로그인
            </CommonButton>
        </>
    );
};
export default LoginTampLate;
