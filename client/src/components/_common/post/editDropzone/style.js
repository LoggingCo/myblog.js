import styled from 'styled-components';

export const EditImgPreview = styled.section`
    width: 100%;
    border: 1px solid ${(props) => props.theme.mainColor};
    border-radius: 0.5rem;
    font-size: 2rem;
    cursor: pointer;
    margin-bottom: 0.5rem;

    & > .inputBox {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 0.5rem;

        & > p {
            font-size: 0.625rem;
            color: #999;
        }
    }
`;

export const EditImgPreviewForm = styled.div`
    padding: 0.3rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    position: relative;
`;

export const EditImgPreviewIneer = styled.div`
    width: 24%;
    height: 100%;
    z-index: 9999;
    margin: 0.2rem;

    :hover {
        opacity: 0.5;
    }

    & > .fileBox {
        position: relative;
        width: 100%;
        height: 100%;

        & > img {
            max-width: 100%;
            max-height: 100%;
        }

        & > p {
            font-size: 1rem;
            color: #222;
            text-align: center;
            width: 100%;
            position: absolute;
            transform: translate(-50%, -50%);
            top: 50%;
            left: 50%;
        }
    }
`;
