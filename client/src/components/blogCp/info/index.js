import { useCallback, useState } from 'react';
import { BlackBackGround } from '@style/common';
import BlogModal from '../modal';
import MyAvatar from './avatar';
import FollowBtn from './followBtn';
import { MyBlogTamplate, MyInfoList, MyInfoTitle } from './style';

const BlogInfo = ({ info, userInfo, postBox }) => {
    // util
    const [modal, setModal] = useState(false);
    const [modalType, setModalType] = useState(null);

    // modal hadnler func

    const onModalHadnler = useCallback((e) => {
        setModal((prev) => !prev);
        setModalType(e.target.getAttribute('type'));
    }, []);

    // post scrollInto func
    const onNavigatePostRef = useCallback(() => {
        postBox.current.scrollIntoView({ behavior: 'smooth' });
    }, []);

    // html
    return (
        <>
            {modal && (
                <>
                    <BlackBackGround />
                    <BlogModal setModal={setModal} type={modalType} />
                </>
            )}
            <MyBlogTamplate>
                <MyAvatar userInfo={userInfo} />
                <p>{info?.nick}</p>
                <MyInfoList>
                    <li onClick={onNavigatePostRef}>{info?.post}</li>
                    <li type="follower" onClick={onModalHadnler}>
                        {info?.follower}
                    </li>
                    <li type="following" onClick={onModalHadnler}>
                        {info?.following}
                    </li>
                    {info?.myinfo === 'Y' && (
                        <li type="ben" onClick={onModalHadnler}>
                            {info?.ben}
                        </li>
                    )}
                </MyInfoList>
                <MyInfoTitle>
                    <li>게시글</li>
                    <li>팔로워</li>
                    <li>팔로잉</li>
                    {info?.myinfo === 'Y' && <li>차단</li>}
                </MyInfoTitle>
                {info?.myinfo === 'Y' && <FollowBtn userInfo={userInfo} info={info} />}
            </MyBlogTamplate>
        </>
    );
};
export default BlogInfo;
