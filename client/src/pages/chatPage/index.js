import ChatContent from '@components/chatCp/content/index';
import ChatForm from '@components/chatCp/form/index';
import ChatList from '@components/chatCp/list/index';
import MainLayOut from '@layout/mainLayOut';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useObServe from '@hooks/useObserve';
import { loadChatGuide, loadChatList, resetChatList } from '@reducer/chatReducer';
import { ChatContentBox, ChatListBox, ChatMainBox, ChatTamplate } from './style';
import { LoaderWrap } from '@style/common';
import ReactLoading from 'react-loading';
import { Link } from 'react-router-dom';
import { useMedia } from '@hooks/useMedia';

const ChatPage = () => {
    // media qurey
    const { isPc, isTablet } = useMedia();

    // util
    const disaptch = useDispatch();

    // ref
    const chatScrollRef = useRef(null);

    // state
    const { chatting, chatList, listLoading, error, loadDone } = useSelector((state) => state.chat);

    // infinit hook
    const observTarget = useRef(null);
    const page = useObServe(observTarget, listLoading);

    useEffect(() => {
        disaptch(loadChatGuide());
        return () => disaptch(resetChatList());
    }, []);

    useEffect(() => {
        if (!listLoading & !error) {
            disaptch(loadChatList(page));
        }
    }, [page, disaptch, error]);

    useEffect(() => {
        if (loadDone) {
            chatScrollRef.current?.scrollIntoView();
        }
    }, [loadDone]);

    return (
        <>
            {isPc || isTablet ? (
                <MainLayOut>
                    <ChatTamplate>
                        <ChatListBox>
                            {chatList.map((v) => (
                                <ChatList info={v} key={v.roomIdx} />
                            ))}
                            <div ref={observTarget}>
                                {listLoading && (
                                    <LoaderWrap>
                                        <ReactLoading
                                            type="spin"
                                            color="#00c7ae"
                                            width={32}
                                            height={32}
                                        />
                                    </LoaderWrap>
                                )}
                            </div>
                        </ChatListBox>
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
            ) : (
                <MainLayOut>
                    <ChatTamplate>
                        <ChatListBox>
                            {chatList.map((v) => (
                                <ChatList info={v} key={v.roomIdx} />
                            ))}
                            <div ref={observTarget}>
                                {listLoading && (
                                    <LoaderWrap>
                                        <ReactLoading
                                            type="spin"
                                            color="#00c7ae"
                                            width={32}
                                            height={32}
                                        />
                                    </LoaderWrap>
                                )}
                            </div>
                        </ChatListBox>
                    </ChatTamplate>
                </MainLayOut>
            )}
        </>
    );
};
export default ChatPage;
