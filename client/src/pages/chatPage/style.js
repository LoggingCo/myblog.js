import styled from 'styled-components';

export const ChatTamplate = styled.div`
    height: calc(100vh - 202px);
    display: flex;
    align-content: auto;
    flex-direction: auto;
    flex-wrap: auto;
    position: relative;
    padding: 2rem;
`;

export const ChatListBox = styled.ul`
    height: 100%;
    width: 20rem;
    border-radius: 0.5rem 0 0 0.5rem;
    border: 1px solid ${(props) => props.theme.mainColor};
    margin-right: 1rem;
    overflow: auto;

    ::-webkit-scrollbar {
        width: 0.5rem;
    }

    ::-webkit-scrollbar-thumb {
        height: 30%;
        background-color: ${(props) => props.theme.mainColor};
    }

    ::-webkit-scrollbar-track {
        background: rgba(33, 122, 244, 0.1);
    }

    @media screen and (max-width: 767px) {
        margin: 0 auto;
        width: 90%;
    }
`;

export const ChatMainBox = styled.div`
    height: 100%;
    width: calc(100% - 21rem);
    position: relative;
    border-radius: 0.5rem;
    border: 1px solid ${(props) => props.theme.mainColor};

    & > a > p {
        border-radius: 0.3rem 0.3rem 0 0;
        padding: 1rem;
        border-bottom: 1px solid ${(props) => props.theme.mainColor};
        color: #222;
        font-weight: bold;
    }

    @media screen and (max-width: 767px) {
        width: 90%;
        margin: 0 auto;
    }
`;

export const ChatContentBox = styled.div`
    height: calc(100% - 97px);
    position: relative;
    overflow-y: auto;
    padding: 1rem;

    ::-webkit-scrollbar {
        display: none;
    }
`;
