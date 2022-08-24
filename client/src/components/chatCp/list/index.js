import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { delChatList, loadChat } from '@reducer/chatReducer';
import { ChatUserList, ChatUserAvatar, ChatUserListBtn } from './style';
import { useNavigate } from 'react-router-dom';
import { useMedia } from '@hooks/useMedia';

const ChatList = ({ info }) => {
    // media qurey
    const { isPc, isTablet } = useMedia();

    // util
    const disaptch = useDispatch();
    const navigate = useNavigate();

    // del list func
    const onChatListRemove = useCallback(() => {
        disaptch(delChatList(info.roomIdx));
    }, []);

    // click list func
    const onLoadChatHandler = useCallback(() => {
        if (isPc || isTablet) {
            disaptch(loadChat(info));
        } else {
            navigate(`/chat/${info.roomIdx}`);
        }
    }, [isPc, isTablet, info]);

    //html

    return (
        <ChatUserList>
            <div style={{ cursur: 'pointer' }} onClick={onLoadChatHandler}>
                <div>
                    <ChatUserAvatar src={'/img/avatar.jfif'} />
                    <span>{info.nick}</span>
                </div>
                <ChatUserListBtn onClick={onChatListRemove}>삭제</ChatUserListBtn>
            </div>
        </ChatUserList>
    );
};
export default ChatList;
