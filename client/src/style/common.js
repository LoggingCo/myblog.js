import styled from 'styled-components';

export const LoaderWrap = styled.div`
    width: 100%;
    height: 80%;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
`;

export const BlackBackGround = styled.div`
    width: 100%;
    height: calc(110vh + 4rem);
    top: 0;
    left: 0;
    z-index: 1100;
    background-color: rgba(0, 0, 0, 0.8);
    position: fixed;
`;

export const PostList = styled.section`
    width: 1080px;
    margin: 0 auto;
    padding: 2rem;

    & > div {
        padding: 2rem;
        width: 90%;
        height: 1080px;
        overflow-y: auto;
        margin: 0 auto;

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
    }

    @media screen and (max-width: 1024px) {
        width: 100%;
    }
`;

export const FlexibleBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${(props) => props.fontColor};
    position: relative;
`;

export const UserInputTamplate = styled.section`
    height: calc(100vh - 202px);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: ${(props) => (props.type === 'login' ? '7rem' : '5rem')};
`;

export const UserInputForm = styled.form`
    padding: 1rem;
    border-radius: 1rem;
    width: 24rem;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    justify-content: center;

    & p {
        height: 3rem;
        display: flex;
        justify-content: space-between;
    }

    & input[type='text'],
    & input[type='password'] {
        margin-bottom: 0.5rem;
        margin-left: 1rem;
        width: 15rem;
        border: none;
        border-bottom: 1px solid rgba(34, 34, 34, 0.5);
        padding-left: 1rem;

        ::placeholder {
            font-size: 0.825rem;
        }
    }
`;
