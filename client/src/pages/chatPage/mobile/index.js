import ChatContent from '@components/chatCp/content/index';
import ChatForm from '@components/chatCp/form/index';
import ChatList from '@components/chatCp/list/index';
import MainLayOut from '@layout/mainLayOut';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useObServe from '@hooks/useObserve';
import { loadChatGuide, loadChatList, resetChatList } from '@reducer/chatReducer';
import { ChatContentBox, ChatMainBox, ChatTamplate } from '../style';
import { Link, useNavigate } from 'react-router-dom';
import { useMedia } from '@hooks/useMedia';

const MobilChatPage = () => {
    // media qurey
    const { isPc, isTablet } = useMedia();

    // util
    const disaptch = useDispatch();
    const naviage = useNavigate();

    // ref
    const chatScrollRef = useRef(null);

    // state
    const { chatting, listLoading, error, loadDone } = useSelector((state) => state.chat);

    // infinit hook
    const observTarget = useRef(null);
    const page = useObServe(observTarget, listLoading);

    useEffect(() => {
        if (isPc || isTablet) {
            naviage('/chat');
        }
        disaptch(loadChatGuide());
        return () => disaptch(resetChatList());
    }, []);

    // return chat
    useEffect(() => {
        if (isPc || isTablet) {
            naviage('/chat');
        }
    }, [chatting]);

    // load chatlist

    useEffect(() => {
        if (!listLoading & !error) {
            disaptch(loadChatList(page));
        }
    }, [page, disaptch]);

    // scroll into

    useEffect(() => {
        if (loadDone) {
            chatScrollRef.current?.scrollIntoView();
        }
    }, [loadDone]);

    return (
        <MainLayOut>
            <ChatTamplate>
                <ChatMainBox>
                    <Link to={`/blog/${chatting?.info.blogIdx}`}>
                        <p>{chatting?.info.nick}</p>
                    </Link>
                    <ChatContentBox>
                        <ChatContent chat={chatting?.content} info={chatting?.info} />
                        <div ref={chatScrollRef} />
                    </ChatContentBox>
                    <ChatForm info={chatting?.info} chatScrollRef={chatScrollRef} />
                </ChatMainBox>
            </ChatTamplate>
        </MainLayOut>
    );
};
export default MobilChatPage;
