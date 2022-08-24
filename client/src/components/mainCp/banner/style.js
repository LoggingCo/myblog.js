import styled from 'styled-components';

export const MainBannerTamplate = styled.section`
    background-color: ${(props) => props.theme.mainColor};
    color: ${(props) => props.theme.subColor};
    width: 100%;
    height: 20rem;
    display: flex;
    align-content: auto;
    flex-direction: auto;
    flex-wrap: auto;
    justify-content: center;
    align-items: center;
    cursor: none;

    & > span {
        font-size: 3rem;
        position: relative;

        & > span {
            font-size: 1rem;
            position: absolute;
            top: 2rem;
            margin-left: 0.3rem;
        }
    }
`;

export const MouseMoving = styled.div`
    position: absolute;
    left: ${(props) => props.x && `${props.x}px`};
    top: ${(props) => props.y && `${props.y}px`};
    color: ${(props) => (props.click ? '#000' : '#fff')};
`;
