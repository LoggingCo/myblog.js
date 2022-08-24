import styled from 'styled-components';

export const MyBlogMyAvatar = styled.img`
    width: 10rem;
    height: 8rem;
    margin: 0 auto;
    cursor: pointer;
    border-radius: 50%;
    display: inline;
`;

export const StandImgButton = styled.button`
    display: inline-block;
    position: absolute;
    width: 2rem;
    height: 2rem;
    background-color: ${(props) => props.theme.mainColor};
    color: ${(props) => props.theme.subColor};
    border-radius: 50%;
    font-size: 0.825rem;
    z-index: 100;
    margin-left: 7rem;
    cursor: pointer;
`;
