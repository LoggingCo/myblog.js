import { useCallback } from 'react';
import { PostCommentList, PostCommentContent, PostCommentBtnBox } from './style';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { commentDel } from '../../../../../reducer/postReducer';

dayjs.locale('ko');
const CommentList = ({ comment, postId }) => {
    const dispatch = useDispatch();

    const onDeleteComment = useCallback(() => {
        dispatch(commentDel({ postId: postId, commentId: comment.id }));
    }, []);

    return (
        <PostCommentList>
            <div>
                <div>
                    <img
                        src="https://cdn2.iconfinder.com/data/icons/circle-icons-1/64/profle-512.png"
                        alt="profile"
                    />
                </div>
                <div>{comment.User.nick}</div>
            </div>
            <PostCommentContent>{comment.content}</PostCommentContent>
            <PostCommentBtnBox>
                <div>{dayjs(comment.createdAt).format('YYYY.MM.DD')}</div>
                <button onClick={onDeleteComment}>✖</button>
            </PostCommentBtnBox>
        </PostCommentList>
    );
};
export default CommentList;
