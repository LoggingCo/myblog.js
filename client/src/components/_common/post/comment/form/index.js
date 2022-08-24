import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInput } from '@hooks/useInput';
import { PostCommentForm } from './style';
import { commentCreate } from '@reducer/postReducer';
import CommonButton from '@common/buttonForm';
import CommonInput from '@common/inputForm';

const CommentForm = ({ postId }) => {
    const dispatch = useDispatch();
    const [content, onChangContent, setContent] = useInput('');
    const { commentDone, commentLoading, error } = useSelector((state) => state.post);

    const onRegistHandler = useCallback(
        (e) => {
            e.preventDefault();
            dispatch(commentCreate({ content: content, postId: postId }));
        },
        [content, dispatch],
    );

    useEffect(() => {
        if (!error) {
            if (commentDone) {
                setContent('');
            }
        } else {
            alert(error);
        }
    }, [commentDone, error]);

    return (
        <PostCommentForm>
            <CommonInput
                value={content}
                onChange={onChangContent}
                width="90%"
                padding="0.2rem"
                borderColor="#ddd"
            />
            <CommonButton
                type="normal"
                width="10%"
                fontSize="0.825rem"
                onClick={onRegistHandler}
                isLoading={commentLoading}
            >
                등록
            </CommonButton>
        </PostCommentForm>
    );
};
export default CommentForm;
