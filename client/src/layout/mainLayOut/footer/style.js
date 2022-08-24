import styled from 'styled-components';

export const FooterWrapper = styled.footer`
    width: 100%;
    background-color: rgba(238, 238, 238, 0.5);
`;

export const FooterTamplate = styled.div`
    margin: 1rem auto;
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: auto;
    flex-wrap: auto;
`;

export const Footertxt = styled.div`
    width: 70%;
    color: #555;

    & p {
        width: 70%;
        font-weight: auto;
        font-size: 0.825rem;
        color: auto;
        margin-top: 5px;
    }

    @media screen and (max-width: 1080px) {
        margin: 0 auto;
        & p {
            width: 100%;
        }
    }
`;

export const FooterRight = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: auto;
    flex-direction: auto;
    flex-wrap: auto;

    & > ul {
        display: flex;
        justify-content: center;
        align-items: center;
        align-content: auto;
        flex-direction: auto;
        flex-wrap: auto;
        padding: 0 2rem;
        background-color: ${(props) => props.theme.mainColor};
        border-radius: 0.5rem;
    }

    & > ul > li {
        padding: 0.25rem 0.5rem;
        font-weight: 300;
        font-size: 1.25rem;
        color: #ffffff;

        & > span {
            font-weight: 500;
        }

        & > i {
            padding-top: 0.5rem;
            font-weight: auto;
            font-size: 1.5rem;
            color: auto;
        }

        :first-child {
            padding-right: 2rem;
        }

        :hover {
            color: #555;
        }
    }
`;
