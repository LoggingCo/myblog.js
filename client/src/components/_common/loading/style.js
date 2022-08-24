import styled from 'styled-components';

export const LoaderWrapper = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #fff;
    opacity: 0.3;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
`;

export const LoaderTamplate = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;
