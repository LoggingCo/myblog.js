import styled from 'styled-components';

export const SearchBox = styled.div`
    position: absolute;
    right: 2rem;
    cursor: pointer;
`;

export const SearchWraaper = styled.div`
    position: relative;
    width: 480px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 767px) {
        width: 85%;
    }

    @media screen and (min-width: 768px) and (max-width: 1024px) {
        width: 90%;
    }
`;
