import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { benAdd, benDel, followingAdd, followingDel } from '@reducer/blogReducer';
import { useNavigate } from 'react-router-dom';
import { addChatList } from '@reducer/chatReducer';
import CommonButton from '@components/_common/buttonForm';
import useDidMountEffect from '@hooks/useDidMountEffect';
import CommonModal from '@common/modalForm';

export const FollowBtn = ({ userInfo, info }) => {
    // util
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // state
    const [text, setText] = useState(null);
    const [modal, setModal] = useState(false);
    const { benDone } = useSelector((state) => state.blog);

    // ben open modal

    const onBenButtonClick = useCallback(() => {
        if (info.benInfo === 'N') {
            setText(`정말 ${info.nick}님을 차단하시겠습니까?`);
        } else {
            setText(`정말 ${info.nick}님의 차단을 해제 하시겠습니까?`);
        }
    }, [info, modal]);

    const closeModal = useCallback(() => {
        setModal(false);
    }, [modal]);

    // close modal

    useDidMountEffect(() => {
        setModal(true);
    }, [text]);

    useEffect(() => {
        setModal(false);
    }, [benDone]);

    // ben add/del dispatch
    const onBenListHandler = useCallback(() => {
        if (info.benInfo === 'N') {
            dispatch(benAdd(userInfo));
        } else {
            dispatch(benDel(userInfo));
        }
    }, [info.benInfo, userInfo]);

    // follow add/del dispatch
    const onFollowingHandler = useCallback(() => {
        if (info.followingInfo === 'N') {
            dispatch(followingAdd(userInfo));
        } else {
            dispatch(followingDel(userInfo));
        }
    }, [info.followingInfo, userInfo]);

    //  chat add/del dispatch

    const onChatListHandler = useCallback(() => {
        dispatch(addChatList({ userInfo: userInfo, navigate: navigate }));
    }, []);

    // html

    return (
        <>
            {modal && (
                <CommonModal
                    type="confirm"
                    size="medium"
                    backColor="#eee"
                    mainColor="#00c7ae"
                    subColor="#ffffff"
                    title="차단 확인"
                    fontSize="0.825rem"
                    padding="1.5rem 2rem 3.5rem 2rem"
                    onSuccess={onBenListHandler}
                    onCancle={closeModal}
                >
                    {text}
                </CommonModal>
            )}
            <CommonButton
                onClick={onBenButtonClick}
                type="reverse"
                size="big"
                margin="0.5rem"
                padding="0.5rem"
                radius="0.5rem"
            >
                {info.benInfo === 'Y' ? '차단 해제' : '차단'}
            </CommonButton>
            <CommonButton
                onClick={onFollowingHandler}
                type="normal"
                size="big"
                margin="0.5rem"
                padding="0.5rem"
                radius="0.5rem"
            >
                {info.followingInfo === 'Y' ? '팔로잉 해제' : '팔로잉'}
            </CommonButton>
            {info.benInfo === 'N' && (
                <CommonButton
                    onClick={onChatListHandler}
                    type="reverse"
                    size="big"
                    margin="0.5rem"
                    padding="0.5rem"
                    radius="0.5rem"
                >
                    메세지
                </CommonButton>
            )}
        </>
    );
};
export default FollowBtn;
