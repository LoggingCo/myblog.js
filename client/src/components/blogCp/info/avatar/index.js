import { useCallback } from 'react';
import { MyBlogMyAvatar, StandImgButton } from './style';
import { useDispatch } from 'react-redux';
import { infoUpdate } from '@reducer/userReducer';

const MyAvatar = ({ userInfo }) => {
    //util

    const dispatch = useDispatch();

    // profileUpdate dispatch

    const onProfileImgHandler = useCallback((e) => {
        const file = e.target.files[0];
        if (e.target.files.length > 1) {
            alert('이미지를 한개만 등록해주세요');
            return;
        } else {
            dispatch(infoUpdate({ userInfo: userInfo, file: file }));
        }
    }, []);

    // standard img dispatch
    const onProfileStandardUpdate = useCallback(() => {
        if (alert('프로필을 기본이미지로 변경하시겠습니까?')) {
            console.log('변경완료');
        }
    }, []);

    // htmlt대표

    return (
        <div>
            {userInfo.img && <StandImgButton onClick={onProfileStandardUpdate}>X</StandImgButton>}
            <label htmlFor="user_avatar">
                <MyBlogMyAvatar src={userInfo.img ? userInfo.img : '/img/avatar.jfif'} />
            </label>
            <input
                type="file"
                id="user_avatar"
                style={{ display: 'none' }}
                onChange={onProfileImgHandler}
            />
        </div>
    );
};
export default MyAvatar;
