import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInput } from '@hooks/useInput';
import { postCreate } from '@reducer/postReducer';
import { PostFormBox, PostFormFlex } from './style';
import PostDropzone from './dropzone';
import CommonButton from '@common/buttonForm';
import CommonInput from '@common/inputForm';

const PostForm = ({ postBox }) => {
    const dispatch = useDispatch();
    const [text, onChangeText, setText] = useInput('');
    const [files, setFiles] = useState([]);
    const { postDone, postLoading, error } = useSelector((state) => state.post);

    const onAddPostHanlder = useCallback(
        (e) => {
            e.preventDefault();
            dispatch(
                postCreate({
                    content: text,
                    files: files.length,
                }),
            );
        },
        [dispatch, text, files],
    );

    // postForm reset

    useEffect(() => {
        if (error === null) {
            if (postDone) {
                postBox.current.scrollIntoView({ behavior: 'smooth' });
                setText('');
                setFiles([]);
            }
        } else {
            alert(error);
        }
    }, [postDone, error]);

    return (
        <PostFormBox>
            <PostFormFlex>
                <CommonInput
                    type="textarea"
                    width="calc(100% - 11rem)"
                    radius="0.5rem"
                    padding="2rem"
                    margin="0 1rem 0 0"
                    placeholder="게시글을 작성해주세요"
                    value={text}
                    onChange={onChangeText}
                ></CommonInput>
                <PostDropzone files={files} setFiles={setFiles} />
            </PostFormFlex>
            <CommonButton
                type="normal"
                size="full"
                height="2rem"
                onClick={onAddPostHanlder}
                isLoading={postLoading}
            >
                등록하기
            </CommonButton>
        </PostFormBox>
    );
};
export default PostForm;
