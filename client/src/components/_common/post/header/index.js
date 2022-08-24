import { useCallback, useRef } from 'react';
import { PostHeaderTamplate, PostHeaderAvatar, PostInfo } from './style';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

dayjs.locale('ko');
const PostHeader = ({ user, date }) => {
    // util
    const naviage = useNavigate();

    // ref
    const dateInfo = useRef(dayjs(date).format('YYYY.MM.DD'));

    // blog naviage func

    const onBlogNavigate = useCallback(() => {
        naviage(`/blog/${user.blogIdx}`);
    }, [naviage]);

    return (
        <PostHeaderTamplate onClick={onBlogNavigate}>
            <PostHeaderAvatar>
                {user.img ? (
                    <img src={user.img} alt="profile" style={{ borderRadius: '50%' }} />
                ) : (
                    <img
                        src="https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/profle-512.png"
                        alt="profile"
                    />
                )}
            </PostHeaderAvatar>
            <PostInfo>
                <div>{user.nick}</div>
                <div className="post_date">{dateInfo.current}</div>
            </PostInfo>
        </PostHeaderTamplate>
    );
};
export default PostHeader;
