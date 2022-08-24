import styled from 'styled-components';

export const ChatTo = styled.div`
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    margin-right: 0.5rem;
    margin-top: 0.5rem;

    & .chat_to_time {
        display: flex;
        max-width: 100%;
        flex-grow: 1;
        flex-basis: 0;
        align-items: flex-end;
        justify-content: flex-end;
        font-size: 0.525rem;
        color: #222;
        margin-right: 0.3rem;
    }

    & .chat_to_box {
        max-width: 70%;
        background-color: ${(props) => props.theme.mainColor};
        border-radius: 5px;
        padding: 0.5rem;
        font-size: 0.875rem;
        margin-top: 0.3rem;
        text-align: left;
        color: #fff;
    }
`;

export const ChatFromName = styled.div`
    text-align: left;
    color: #222;
    font-size: 0.675rem;
    box-sizing: border-box;
    margin-left: 0.7rem;
    margin-top: 0.5rem;
`;

export const ChatFrom = styled.div`
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    margin-right: 0.5rem;

    & > .chat_from_box {
        max-width: 65%;
        background-color: #eee;
        border-radius: 5px;
        padding: 0.5rem;
        font-size: 0.875rem;
        margin-top: 0.3rem;
        text-align: left;
        margin-left: 0.5rem;
    }

    & > .chat_from_time {
        display: flex;
        max-width: 100%;
        flex-grow: 1;
        flex-basis: 0;
        align-items: flex-end;
        justify-content: flex-start;
        font-size: 0.525rem;
        color: #222;
        margin-left: 0.2rem;
    }
`;

export const ChatNewRoomP = styled.p`
    text-align: center;
    margin-top: 1rem;
    padding: 1rem;
    font-size: 0.825rem;
    border: 1px solid ${(props) => props.theme.mainColor};
    border-radius: 1rem;
`;
