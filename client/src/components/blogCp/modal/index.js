import ModalHeader from './header';
import ModalList from './list';
import { ModalContentBox } from './style';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { benRead, followerRead, followingRead, resetList } from '@reducer/blogReducer';
import useObServe from '@hooks/useObserve';
import ReactLoading from 'react-loading';
import { LoaderWrap } from '@style/common';

const BlogModal = ({ type, setModal }) => {
    // util
    const dispatch = useDispatch();

    // modal title statate
    const [headTitle, setHeadTitle] = useState(null);

    // state
    const { list, isLoading, error } = useSelector((state) => state.blog);

    // infinit hook
    const observTarget = useRef(null);
    const page = useObServe(observTarget, isLoading);

    // setTitle func
    useEffect(() => {
        if (type === 'follower') {
            setHeadTitle('팔로워 목록');
        } else if (type === 'following') {
            setHeadTitle('팔로윙 목록');
        } else if (type === 'ben') {
            setHeadTitle('차단 목록');
        }
    }, []);

    // readList disaptch
    useEffect(() => {
        if (!isLoading & !error) {
            if (type === 'follower') {
                dispatch(followerRead(page));
            } else if (type === 'following') {
                dispatch(followingRead(page));
            } else if (type === 'ben') {
                dispatch(benRead(page));
            }
        }
    }, [page, error]);

    // reset disaptch
    useEffect(() => {
        return () => dispatch(resetList());
    }, []);

    // html
    return (
        <ModalContentBox>
            <ModalHeader setModal={setModal} title={headTitle} />
            <div>
                <ul>
                    {list.map((v) => (
                        <ModalList key={v.blogIdx} info={v} />
                    ))}
                    <div ref={observTarget}>
                        {isLoading && (
                            <LoaderWrap>
                                <ReactLoading type="spin" color="#00c7ae" width={32} height={32} />
                            </LoaderWrap>
                        )}
                    </div>
                </ul>
            </div>
        </ModalContentBox>
    );
};
export default BlogModal;
