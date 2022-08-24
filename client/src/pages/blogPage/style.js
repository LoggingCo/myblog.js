import styled from 'styled-components';

export const MyBlogSmallCircle = styled.span`
    display: block;
    border-radius: 50%;
    width: 0.5rem;
    height: 0.5rem;
    border: 1px solid ${(props) => props.theme.mainColor};
    margin: 1rem auto;
`;

export const MyBlogMediumCircle = styled.span`
    display: block;
    border-radius: 50%;
    width: 1rem;
    height: 1rem;
    background-color: ${(props) => props.theme.mainColor};
    margin: 1rem auto;
`;

export const MyBlogColumnLine = styled.hr`
    height: 20vh;
    width: 0.05vw;
    border-width: 0;
    color: #000;
    background-color: ${(props) => props.theme.mainColor};
    margin: 0 auto;
`;
