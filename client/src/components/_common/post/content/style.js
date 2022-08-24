import styled from 'styled-components';

export const PostContentTamplate = styled.div`
    width: 100%;
    word-break: break-all;
    padding: 1.5rem;
    margin-top: 1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 8;
    -webkit-box-orient: vertical;
    font-size: 0.875rem;
`;

export const PostImgBox = styled.div`
    margin: 0 auto;
    position: relative;
    display: flex;
    margin-bottom: 2rem;

    & > div {
        margin: 0 auto;
        max-width: 49%;
        aspect-ratio: 4 / 3;
    }

    & > div > img {
        width: 30rem;
        aspect-ratio: 4 / 3;
    }

    & > .post_images {
        width: 49%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border: 1px solid ${(props) => props.theme.mainColor};
        font-size: 3rem;
        font-weight: bold;
        line-height: 70%;
        cursor: pointer;

        & > span {
            color: #999;
            font-size: 0.825rem;
        }
    }

    @media screen and (max-width: 767px) {
        & > .post_images {
            font-size: 1.5rem;

            & > span {
                font-size: 0.525rem;
            }
        }
    }

    @media screen and (min-width: 768px) and (max-width: 1024px) {
        & > .post_images {
            font-size: 2.5rem;

            & > span {
                font-size: 0.725rem;
            }
        }
    }
`;
