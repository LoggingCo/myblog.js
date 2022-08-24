import styled from 'styled-components';

export const ChatUserList = styled.li`
    padding: 1rem;
    width: 100%;
    color: #555;
    background-color: rgba(0, 199, 174, 0.2);

    & > div {
        display: flex;
        align-items: center;
        justify-content: space-between;

        & > div:first-child {
            display: flex;
            align-items: center;

            & > span {
                max-width: 80%;
                cursor: pointer;
                height: 100%;
                font-size: 0.825rem;
            }
        }
    }

    :hover {
        background-color: #eee;
    }
`;

export const ChatUserAvatar = styled.img`
    width: 2rem;
    height: 1.5rem;
    cursor: pointer;
    border-radius: 50%;
    margin-right: 0.5rem;
`;

export const ChatUserListBtn = styled.div`
    margin: 0 0.5rem;
    cursor: pointer;
    font-size: 0.825rem;
    color: #ff0000;
`;
