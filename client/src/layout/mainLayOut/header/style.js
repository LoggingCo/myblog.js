import styled from 'styled-components';

export const HeaderWrapper = styled.header`
    width: 100%;
    position: fixed;
    padding: 1rem;
    z-index: 1000;
    background-color: ${(props) => props.theme.subColor}; ;
`;

export const HeaderContent = styled.header`
    width: 100%;
    display: flex;
    justify-content: space-between;

    @media screen and (max-width: 1024px) {
        margin-bottom: 0.5rem;
    }
`;

export const HeaderLogo = styled.div`
    margin-left: 3rem;
    font-weight: bold;
    color: ${(props) => props.theme.mainColor};
    font-size: 1.5rem;
    cursor: pointer;
`;

export const HeaderList = styled.ul`
    display: flex;
    align-content: auto;
    flex-direction: auto;
    flex-wrap: auto;
    float: right;
    margin-right: 3rem;
    color: ${(props) => props.theme.mainColor};
    position: relative;
    align-items: center;
    height: 2.5rem;
    font-size: 0.825rem;

    & > li {
        cursor: pointer;
    }

    & > a > li {
        cursor: pointer;

        ::after {
            content: '|';
            clear: both;
            margin: 0 0.5rem;
        }
    }

    & > a:last-child > li {
        ::after {
            content: '';
            clear: both;
        }
    }
`;
