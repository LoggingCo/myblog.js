import styled from 'styled-components';

export const PostHeaderTamplate = styled.header`
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    border-bottom: 1px solid #ddd;
    padding-bottom: 0.6rem;
    cursor: pointer;

    @media screen and (max-width: 767px) {
        margin: 0 auto;
        width: 80%;
        display: block;
    }
`;

export const PostHeaderAvatar = styled.div`
    box-sizing: border-box;
    display: inline-block;
    width: 2rem;
    height: 2rem;
    vertical-align: middle;
    text-align: center;
    margin: 0 1rem;

    @media screen and (max-width: 767px) {
        width: 100%;
        margin-bottom: 1rem;

        & > img {
            margin: 0 auto;
            width: 2rem;
            height: 2rem;
        }
    }
`;

export const PostInfo = styled.div`
    margin-right: 1rem;
    font-size: 0.825rem;
    color: #888;
    width: 92%;

    & > div {
        display: inline-block;
    }

    & .post_date {
        float: right;

        & > span {
            font-size: 0.675rem;
        }
    }
`;
