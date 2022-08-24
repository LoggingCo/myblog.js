import styled from 'styled-components';

export const ImgZoomPage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem auto;
    text-align: center;
    font-size: 1.5rem;
    color: ${(props) => props.theme.subColor};

    & > .img_zoom_prev {
        cursor: pointer;
        margin-right: 2rem;
        font-size: 1rem;
    }

    & > .img_zoom_next {
        cursor: pointer;
        margin-left: 2rem;
        font-size: 1rem;
    }
`;
