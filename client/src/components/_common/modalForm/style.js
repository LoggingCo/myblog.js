import styled from 'styled-components';

export const MyBlogModal = styled.div`
    position: fixed;
    overflow: ${(props) => props.overflow};
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 200;
    border-radius: ${(props) => props.radius && props.radius};

    width: ${(props) =>
        props.width
            ? props.width
            : props.size === 'small'
            ? '19rem'
            : props.size === 'medium'
            ? '32rem'
            : props.size === 'big'
            ? '48rem'
            : props.size === 'full' && '100%'};
`;

export const CommonModalHeader = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    background-color: ${(props) => props.mainColor};
    color: ${(props) => props.subColor};
    font-size: ${(props) => props.fontSize};
    padding: 0.3rem;

    & > div {
        margin: 0 1rem;
    }
`;

export const ModalInner = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.backColor};
    padding: ${(props) => props.padding && props.padding};
`;

export const ModalButtonBox = styled.div`
    position: absolute;
    bottom: 10%;
    right: 5%;
`;
