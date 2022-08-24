import styled from 'styled-components';

export const ModalContentBox = styled.div`
    width: 18rem;
    background-color: #eee;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2000;

    & > div {
        max-height: 24rem;
        overflow: auto;

        ::-webkit-scrollbar {
            width: 0.5rem;
        }

        ::-webkit-scrollbar-thumb {
            height: 30%;
            background-color: ${(props) => props.theme.mainColor};
        }

        ::-webkit-scrollbar-track {
            background: rgba(33, 122, 244, 0.1);
        }

        & > ul > li:hover {
            opacity: 0.5;
            cursor: pointer;
        }
    }
`;
