import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signUser } from '@reducer/userReducer';
import AgreeCheckBox from '../agreeCheckBox';
import { useInput } from '@hooks/useInput';
import CommonButton from '@components/_common/buttonForm';
import { useRef } from 'react';
import { encrypt } from '@util/crypto';

const SignTamplate = () => {
    // util
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // state hook
    const [email, onChangeEmail, setEmail] = useInput('');
    const [nick, onChangeNick, setNick] = useInput('');
    const [pw, onChnagePw, setPw] = useInput('');
    const [hp, onChnageHp, setHp] = useInput('');
    const [confirm, onChnageConfirm] = useInput('');

    const [error, setError] = useState(null);

    // check state

    const [snsFlag, setSNS] = useState(0);
    const [acceptFlag, setAccept] = useState(0);
    const [promtFlag, setPromt] = useState(0);

    // confirm check func

    useEffect(() => {
        if (pw.length > 0 && confirm.length > 0) {
            if (confirm === pw) {
                setError(false);
                return;
            } else {
                setError(true);
            }
        } else {
            setError(false);
        }
    }, [confirm, pw]);

    // exp
    const pwExp = useRef(
        /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/,
    );

    const emailExp = useRef(
        /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
    );

    // result check func
    const onSignHandler = useCallback(
        (e) => {
            e.preventDefault();
            if (!pwExp.current.test(pw)) {
                if (!alert('비밀번호 형식이 일치하지 않습니다 (대문자, 소문자, 특수문자 포함)')) {
                    setPw('');
                    return;
                }
            }
            if (!emailExp.current.test(email)) {
                if (!alert('이메일 형식이 일치하지 않습니다')) {
                    setEmail('');
                    return;
                }
            }
            if (hp.length !== 13) {
                if (!alert('전화번호 형식이 일치하지 않습니다')) {
                    setHp('');
                    return;
                }
            }

            const data = {
                email: email,
                nickname: nick,
                password: encrypt(pw, process.env.REACT_APP_USER_KEY),
                hpNumber: hp,
                snsFlag: snsFlag,
                acceptFlag: acceptFlag,
                promtFlag: promtFlag,
            };
            dispatch(signUser({ data: data, navigate: navigate }));
        },
        [pw, email, nick, pw, hp, snsFlag, acceptFlag, promtFlag, dispatch],
    );

    //html

    return (
        <>
            <p>
                이메일
                <input
                    type="text"
                    placeholder=".com"
                    autoComplete="off"
                    vale={email}
                    onChange={onChangeEmail}
                />
            </p>
            <p>
                닉네임
                <input
                    type="text"
                    placeholder="6자 이하"
                    maxLength={6}
                    autoComplete="off"
                    value={nick}
                    onChange={onChangeNick}
                />
            </p>
            <p>
                비밀번호
                <input
                    type="password"
                    placeholder="대문자, 소문자, 특수문자 포함 8자리 이상"
                    maxLength={16}
                    autoComplete="off"
                    value={pw}
                    onChange={onChnagePw}
                />
            </p>
            {error && (
                <div
                    style={{
                        color: '#ff0000',
                        textAlign: 'center',
                        fontSize: '0.825rem',
                        margin: '0.5rem',
                    }}
                >
                    비밀번호 확인이 일치하지 않습니다
                </div>
            )}
            <p>
                비밀번호 확인
                <input
                    type="password"
                    placeholder="비밀번호를 한번 더 입력해주세요"
                    maxLength={16}
                    autoComplete="off"
                    value={confirm}
                    onChange={onChnageConfirm}
                />
            </p>
            <p>
                핸드폰 번호
                <input
                    type="text"
                    placeholder="010-0000-0000"
                    maxLength={13}
                    autoComplete="off"
                    value={hp
                        .replace(/[^0-9]/g, '')
                        .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
                        .replace(/\-{1,2}$/g, '')}
                    onChange={onChnageHp}
                />
            </p>
            <CommonButton
                type="reverse"
                size="full"
                height="2rem"
                margin="0.5rem 0"
                fontSize="0.825rem"
            >
                <button disabled>인증하기</button>
            </CommonButton>
            <AgreeCheckBox setSNS={setSNS} setPromt={setPromt} setAccept={setAccept} />
            <CommonButton
                type="normal"
                size="full"
                height="2rem"
                margin="0.5rem 0"
                fontSize="0.825rem"
                onClick={onSignHandler}
                disabled={error}
            >
                회원가입
            </CommonButton>
        </>
    );
};
export default SignTamplate;
