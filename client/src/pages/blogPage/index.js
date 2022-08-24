import PostForm from '@components/_common/post/form';
import BlogInfo from '@components/blogCp/info';
import CommonPost from '@components/_common/post';
import MainLayOut from '@layout/mainLayOut';
import { MyBlogColumnLine, MyBlogMediumCircle, MyBlogSmallCircle } from './style';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import ReactLoading from 'react-loading';
import useObServe from '@hooks/useObserve';
import { blogLoad } from '@reducer/blogReducer';
import { blogPostRead, resetPost } from '@reducer/postReducer';
import { LoaderWrap, PostList } from '@style/common';
import { useParams } from 'react-router-dom';
import CommonLoading from '@common/loading';
import { useMedia } from '@hooks/useMedia';

const BlogPage = () => {
    // media qurey
    const { isPc } = useMedia();

    // util
    const dispatch = useDispatch();

    // ref
    const postBox = useRef(null);

    // state
    const { userInfo } = useSelector((state) => state.user);
    const { post, isLoading, error } = useSelector((state) => state.post);
    const { blog, blogLoading } = useSelector((state) => state.blog);
    const { blogIdx } = useParams();

    console.log(blogIdx);

    // infinit hook
    const observTarget = useRef(null);
    const page = useObServe(observTarget, isLoading);

    // blog info dispatch
    useEffect(() => {
        if (userInfo) {
            dispatch(blogLoad(userInfo));
        }
    }, [userInfo, dispatch]);

    // reset post dispatch
    useEffect(() => {
        return () => dispatch(resetPost());
    }, []);

    // blog post load dispatch
    useEffect(() => {
        if (!isLoading & !error) {
            dispatch(blogPostRead(page));
        }
    }, [page, dispatch, error]);

    // html

    return (
        <>
            {blogLoading && <CommonLoading />}
            <MainLayOut>
                <BlogInfo info={blog && blog} userInfo={userInfo} postBox={postBox} />
                {isPc && (
                    <>
                        <MyBlogSmallCircle />
                        <MyBlogMediumCircle />
                        <MyBlogColumnLine />
                        <MyBlogSmallCircle />
                    </>
                )}
                <section>
                    {blog?.myinfo === 'Y' ? (
                        <p style={{ textAlign: 'center' }}>
                            ☀️ 안녕하세요, {userInfo.ncik}님? 오늘은 어떤일이 있으셨나요?
                        </p>
                    ) : (
                        <p style={{ textAlign: 'center' }}>
                            ☀️ 안녕하세요, {userInfo.ncik}님의 블로그에 오신 것을 환영합니다
                        </p>
                    )}
                    <PostForm postBox={postBox} />
                    <PostList>
                        <div>
                            <div ref={postBox}></div>
                            {post.map((v) => (
                                <CommonPost key={v.id} post={v} />
                            ))}
                            <div ref={observTarget}>
                                {isLoading && (
                                    <LoaderWrap>
                                        <ReactLoading type="spin" color="#00c7ae" />
                                    </LoaderWrap>
                                )}
                            </div>
                        </div>
                    </PostList>
                </section>
            </MainLayOut>
        </>
    );
};
export default BlogPage;
