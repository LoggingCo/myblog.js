import styled from 'styled-components';

export const ImgZoomHeader = styled.div`
    width: 100%;
    height: 3rem;
    background-color: ${(props) => props.theme.mainColor};
    color: ${(props) => props.theme.subColor};
    font-size: 0.825rem;
    position: relative;
    z-index: 200;

    & > div {
        display: inline-block;
        height: 100%;
        vertical-align: middle;
        font-size: 0.825rem;
        margin-top: 0.8rem;
    }

    & > div:first-child {
        margin-left: 3rem;
    }

    & > div:last-child {
        float: right;
        margin-right: 3rem;
    }
`;
