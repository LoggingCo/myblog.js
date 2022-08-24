import styled from 'styled-components';

export const HeaderTamplate = styled.div`
    width: 100%;
    height: 2rem;
    background-color: ${(props) => props.theme.mainColor};
    color: ${(props) => props.theme.subColor};
    font-size: 0.825rem;

    & > div {
        display: inline-block;
        vertical-align: middle;
        margin-top: 0.3rem;
    }

    & > .modal_title {
        margin-left: 1rem;
    }

    & > .modal_close_btn {
        float: right;
        margin-right: 1rem;
    }
`;
