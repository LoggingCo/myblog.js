import styled from 'styled-components';

export const MyBlogTamplate = styled.div`
    width: 80%;
    padding: 2rem;
    border: 1px solid ${(props) => props.theme.mainColor};
    text-align: center;
    margin: 2rem auto;
`;

export const MyInfoList = styled.ul`
    display: flex;
    align-content: auto;
    flex-direction: auto;
    flex-wrap: auto;
    font-size: 1.5rem;
    width: 100%;
    justify-content: center;
    padding-left: 1.5rem;
    color: #777;

    & > li {
        cursor: pointer;

        ::after {
            content: '|';
            color: #999;
            font-size: 1rem;
            margin: 0 1rem;
        }

        :last-child::after {
            content: '';
        }
    }
`;

export const MyInfoTitle = styled.ul`
    display: flex;
    align-content: auto;
    flex-direction: auto;
    flex-wrap: auto;
    width: 100%;
    justify-content: center;
    padding-bottom: 2rem;

    & > li {
        margin: 0 0.5rem;
    }
`;
