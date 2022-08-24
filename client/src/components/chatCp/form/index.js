import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendChat } from '@reducer/chatReducer';
import { ChatSendTamplate } from './style';
import dayjs from 'dayjs';

dayjs().locale('ko');
const ChatForm = ({ info, chatScrollRef }) => {
    // util
    const disaptch = useDispatch();

    //state
    const { sendDone, error } = useSelector((state) => state.chat);

    //ref
    const textRef = useRef(null);

    //textChange func
    const onTextChangeHadnler = useCallback(
        (e) => {
            if (e.ctrlKey) {
                if (e.key === 'Enter') {
                    const val = e.target.value;
                    const start = e.target.selectionStart;
                    e.target.value = val.slice(0, start) + '\n' + val.slice(e.target.selectionEnd);
                    e.preventDefault();
                }
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (e.target.value.trim() === '') {
                    return;
                } else {
                    disaptch(
                        sendChat({
                            info: info,
                            content: {
                                content: e.target.value,
                                createdAt: dayjs().format('A HH:mm'),
                                read: 'N',
                            },
                        }),
                    );
                }
            }
        },
        [info],
    );

    // chatForm reset
    useEffect(() => {
        if (error) {
            alert(error);
            return;
        } else {
            if (sendDone) {
                textRef.current.value = '';
                chatScrollRef.current.scrollIntoView();
            }
        }
    }, [sendDone, error]);

    //send button func
    const onSendChatHandler = (e) => {
        e.preventDefault();
        if (textRef.current.value.trim() === '') {
            return;
        } else {
            disaptch(
                sendChat({
                    info: info,
                    content: {
                        content: textRef.current.value,
                        createdAt: dayjs().format('A HH:mm'),
                        read: 'N',
                    },
                }),
            );
        }
    };

    // html

    return (
        <ChatSendTamplate>
            <textarea onKeyPress={onTextChangeHadnler} ref={textRef}></textarea>
            <button onClick={onSendChatHandler}>전송</button>
        </ChatSendTamplate>
    );
};
export default ChatForm;
