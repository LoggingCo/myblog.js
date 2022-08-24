import styled from 'styled-components';

export const PostPreview = styled.section`
    width: 10rem;
    height: 10rem;
    border: 1px solid ${(props) => props.theme.mainColor};
    border-radius: 0.5rem;
    font-size: 2rem;
    cursor: pointer;

    & > .inputBox {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        & > p {
            font-size: 0.625rem;
            color: #999;
        }
    }
`;

export const PostFormPreview = styled.div`
    width: 100%;
    height: 10rem;
    padding: 0.3rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`;

export const PostPreviewIneer = styled.div`
    max-width: 43%;
    height: 49%;
    margin: 0.2rem;
    z-index: 9999;

    :hover {
        opacity: 0.5;
    }

    & > .fileBox {
        width: 100%;
        height: 100%;
        position: relative;

        & > img {
            width: 90%;
            height: 85%;
        }

        & > p {
            font-size: 0.625rem;
            color: #999;
            text-align: center;
            width: 100%;
            position: absolute;
            transform: translate(-50%, -50%);
            top: 50%;
            left: 50%;
        }
    }
`;
