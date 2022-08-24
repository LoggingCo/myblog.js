import { useCallback, useEffect, useRef, useState } from 'react';
import { BlackBackGround } from '@style/common';
import CommentForm from './comment/form';
import CommentList from './comment/list';
import PostContent from './content';
import PostHeader from './header';
import { PostDesc, PostButtonBox, PostCommentHeader } from './style';
import PostZoom from './zoom';
import EditDropZone from './editDropzone';
import { useDispatch, useSelector } from 'react-redux';
import { postUpdate, postDel } from '@reducer/postReducer';
import { useInput } from '@hooks/useInput';
import CommonButton from '@common/buttonForm';
import CommonInput from '@common/inputForm';
import { useMediaQuery } from 'react-responsive';
import { useMemo } from 'react';

const CommonPost = ({ post }) => {
    // util
    const dispatch = useDispatch();

    // media qurey
    const isMobile = useMediaQuery({
        query: '(max-width:767px)',
    });

    // state
    const [edit, setEdit] = useState(false);
    const [showComment, setShowComment] = useState(false);
    const [zoomModal, setZoomModal] = useState(false);
    const [content, setContent] = useState('');
    const [moreText, setMoreText] = useState(false);

    // text limit
    const textLimit = useMemo(() => {
        return isMobile ? 50 : 200;
    }, [isMobile]);

    /*
    useRef 와 useMoemo의 차이점
    memo는 의존성 배열 값이 연산됨에 따라 재할당
    그러나 ref는 재연산 되지 않으므로 useEffect로 변경해줘야함
    따라서 연산에 따라 갑시 달라지는 경우 memo를 사용하는 것이 좋음

    const textLimit = useRef(isMobile ? 50 : 200);
    useEffect(() => {
        if (isMobile) {
            textLimit.current = 50;
        } else {
            textLimit.current = 200;
        }
    }, [isMobile]);
    */

    const [text, onChangeText] = useInput(post.content);
    const { editDone, editLoading } = useSelector((state) => state.post);

    // file state
    const [files, setFiles] = useState(
        post.Images.map((v) => ({
            preview: v,
        })),
    );

    // setEdlit Files reset state

    useEffect(() => {
        setFiles(
            post.Images.map((v) => ({
                preview: v,
            })),
        );
    }, [edit]);

    // edit delete func

    const onPostEditHandler = useCallback(() => {
        dispatch(postUpdate({ postId: post.id, content: text, files: files.length }));
    }, [text, files, dispatch]);

    const onPostDeleteHandler = useCallback(() => {
        if (!alert('정말 삭제하시겠습니까?')) {
            dispatch(postDel(post.id));
        }
    }, []);

    // edit Done Reset
    useEffect(() => {
        setEdit(false);
    }, [editDone]);

    // content Limit

    useEffect(() => {
        if (post) {
            if (post.content.length > textLimit) {
                setContent(post.content.slice(0, textLimit) + '...');
            } else {
                setContent(post.content);
            }
        } else return;
    }, [post, textLimit]);

    // more text

    const onMoreTextHandler = useCallback(() => {
        setMoreText((prev) => !prev);
    }, []);

    useEffect(() => {
        if (post.content.length > textLimit) {
            if (moreText) {
                setContent(post.content);
            } else {
                setContent(post.content.slice(0, textLimit) + '...');
            }
        } else return;
    }, [moreText, textLimit]);

    // html

    return (
        <>
            {zoomModal && (
                <>
                    <BlackBackGround />
                    <PostZoom setZoomModal={setZoomModal} Images={post.Images} />
                </>
            )}
            <PostDesc>
                <PostHeader user={post.User} date={post.createdAt} />
                {post?.myPost === 'Y' && (
                    <PostButtonBox>
                        <button onClick={() => setEdit((prev) => !prev)}>수정</button>
                        <button onClick={onPostDeleteHandler}>삭제</button>
                    </PostButtonBox>
                )}
                {edit ? (
                    <>
                        <CommonInput
                            type="textarea"
                            width="100%"
                            height="10rem"
                            padding="1rem"
                            margin="1rem 0"
                            borderColor="#ddd"
                            value={text}
                            onChange={onChangeText}
                        ></CommonInput>
                        <EditDropZone files={files} setFiles={setFiles} />
                        <CommonButton
                            type="normal"
                            size="full"
                            height="2rem"
                            onClick={onPostEditHandler}
                            isLoading={editLoading}
                        >
                            수정하기
                        </CommonButton>
                    </>
                ) : (
                    <>
                        <PostContent
                            content={content}
                            Images={post.Images}
                            setZoomModal={setZoomModal}
                        />
                        {post.content.length > textLimit && (
                            <p className="post_more" onClick={onMoreTextHandler}>
                                {moreText ? ' 닫기 ' : '더 보기'}
                            </p>
                        )}
                    </>
                )}
                <PostCommentHeader onClick={() => setShowComment((prev) => !prev)}>
                    <div>댓글 {post.Comments.length}개</div>
                    <div>댓글 달기</div>
                </PostCommentHeader>
                {/* <!-- comment --> */}
                {showComment && (
                    <div>
                        <CommentForm postId={post.id} />
                        {post.Comments.map((v) => (
                            <CommentList key={v.id} comment={v} postId={post.id} />
                        ))}
                    </div>
                )}
            </PostDesc>
        </>
    );
};
export default CommonPost;
