import styled from 'styled-components';

export const ImgZoomSlide = styled.div`
    position: fixed;
    margin-top: 2rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 200;
    overflow-x: hidden;

    & > ul {
        display: flex;
        max-width: 32rem;
        aspect-ratio: 4 / 3;
        transition: all 1.5s ease-in-out;

        & > li > img {
            width: 32rem;
            aspect-ratio: 4 / 3;
        }
    }
`;
