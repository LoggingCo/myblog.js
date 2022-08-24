import styled from 'styled-components';

export const ChatSendTamplate = styled.div`
    position: absolute;
    display: flex;
    align-content: auto;
    flex-direction: auto;
    flex-wrap: auto;
    bottom: 0;
    width: 100%;

    & > textarea {
        border-radius: 0.25rem 0 0 0.2rem;
        margin-left: 1rem;
        padding-top: 0.5rem;
        padding-left: 1rem;
        height: 2.5rem;
        width: calc(100% - 8rem);
        border: 1px solid ${(props) => props.theme.mainColor};
        border-bottom: none;
        resize: none;
        overflow-wrap: break-word;
        word-break: break-all;
        white-space: pre-wrap;
        resize: none;

        ::-webkit-scrollbar {
            display: none;
        }

        :focus {
            outline: none;
        }
    }

    & > button {
        width: 7rem;
        border-radius: 0 0 0.5rem 0;
        border-top: 1px solid ${(props) => props.theme.mainColor};
        background-color: ${(props) => props.theme.subColor};
        color: ${(props) => props.theme.mainColor};

        :hover {
            opacity: 0.8;
            background-color: ${(props) => props.theme.mainColor};
            color: ${(props) => props.theme.subColor};
        }
    }
`;
