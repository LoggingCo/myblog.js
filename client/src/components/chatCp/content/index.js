import { ChatFrom, ChatFromName, ChatTo, ChatNewRoomP } from './style';

const ChatContent = ({ chat, info }) => {
    return (
        <>
            {chat && chat.length > 0 ? (
                chat.map((v, index) =>
                    v.from ? (
                        <div key={index}>
                            <ChatFromName>{v.from}</ChatFromName>
                            <ChatFrom>
                                <div className="chat_from_box">
                                    {v.content.split('\n').map((v) => {
                                        return (
                                            <span>
                                                {v}
                                                <br />
                                            </span>
                                        );
                                    })}
                                </div>
                                <div className="chat_from_time">{v.createdAt}</div>
                            </ChatFrom>
                        </div>
                    ) : (
                        <ChatTo key={index}>
                            <div className="chat_to_time">{v.createdAt}</div>
                            <div className="chat_to_box">
                                {v.content.split('\n').map((v) => {
                                    return (
                                        <span>
                                            {v}
                                            <br />
                                        </span>
                                    );
                                })}
                            </div>
                        </ChatTo>
                    ),
                )
            ) : (
                <ChatNewRoomP>{`${info && info.nick}님과의 대화를 시작해보세요 👋`}</ChatNewRoomP>
            )}
        </>
    );
};
export default ChatContent;
