import { useEffect, useRef } from 'react';
import MainLayOut from '@layout/mainLayOut';
import MainBanner from '@components/mainCp/banner/';
import CommonPost from '@components/_common/post/';
import { useDispatch, useSelector } from 'react-redux';
import { postRead, resetPost } from '@reducer/postReducer';
import ReactLoading from 'react-loading';
import useObServe from '@hooks/useObserve';
import { LoaderWrap, PostList } from '@style/common';

const MainPage = () => {
    // util
    const dispatch = useDispatch();

    // state
    const { post, isLoading, error } = useSelector((state) => state.post);

    // infinite hook
    const observTarget = useRef(null);
    const page = useObServe(observTarget, isLoading);

    // reset post
    useEffect(() => {
        return () => dispatch(resetPost());
    }, []);

    // mainpost dispatch
    useEffect(() => {
        if (!isLoading & !error) {
            dispatch(postRead(page));
        }
    }, [page, dispatch, error]);

    // html

    return (
        <MainLayOut>
            <MainBanner />
            <PostList>
                <p>☀️ 오늘은, 내 친구들에게 어떤 일들이 있어났을까요?</p>
                <div>
                    {post.map((v) => (
                        <CommonPost post={v} key={v.id} />
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
        </MainLayOut>
    );
};
export default MainPage;
