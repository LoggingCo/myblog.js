import styled from 'styled-components';

export const PostCommentList = styled.div`
    font-size: 0.75rem;
    color: #666;
    width: 100%;
    padding: 0.2rem 0;

    & div {
        display: inline-block;
        vertical-align: middle;
    }

    & > div:first-child {
        float: left;
        margin: 0 1.5rem 0 0.2rem;

        & > div:first-child {
            width: 1rem;
            height: 1rem;
            margin-right: 0.5rem;
        }
    }

    @media screen and (max-width: 1024px) {
        & div {
            display: block;
        }

        & > div:first-child {
            width: 100%;
            display: flex;
            margin-bottom: 0.5rem;

            & > div:first-child {
                width: 1rem;
                height: 1rem;
                margin-right: 0.5rem;
            }
        }
    }
`;

export const PostCommentContent = styled.div`
    max-width: 70%;
    word-break: break-all;

    @media screen and (max-width: 768px) {
        word-break: break-all;
        max-width: 100%;
        padding: 1rem 10% 0 10%;
    }

    @media screen and (min-width: 769px) and (max-width: 1024px) {
        word-break: break-all;
        max-width: 100%;
        padding: 1rem 5% 0 5%;
    }
`;

export const PostCommentBtnBox = styled.div`
    float: right;

    & > div {
        display: inline-block;
        margin: 0 0.5rem;
    }

    & > button {
        cursor: pointer;
        margin-right: 1rem;
    }

    @media screen and (max-width: 1024px) {
        float: none;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 1rem;
        color: #999;

        & div:first-child {
            margin: 0 0.5rem 0 10%;
        }
    }

    @media screen and (min-width: 768px) and (max-width: 1024px) {
        & div:first-child {
            margin: 0 0.5rem 0 5%;
        }
    }
`;
