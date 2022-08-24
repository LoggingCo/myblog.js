import styled from 'styled-components';

export const PostDesc = styled.article`
    width: 100%;
    border: 1px solid ${(props) => props.theme.mainColor};
    border-radius: 0.5rem;
    margin: 1rem 0;
    padding: 1rem;
    background-color: rgba(0, 199, 174, 0.2);

    & > .post_more {
        padding-left: 1.5rem;
        color: #999;
        font-size: 0.5rem;
        cursor: pointer;
    }
`;

export const PostButtonBox = styled.div`
    float: right;
    padding-top: 0.5rem;

    & > button {
        margin-right: 1rem;
        font-size: 0.5rem;
        color: #888;
    }

    & > button:last-child {
        color: #ff0000;
        font-weight: bold;
    }
`;

export const PostCommentHeader = styled.div`
    display: flex;
    align-content: auto;
    flex-direction: auto;
    flex-wrap: auto;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    font-size: 0.75rem;
    margin: 3rem 0.3rem 0.3rem 0.3rem;
    color: #999;
    width: 100%;
`;

export const ImageEditBox = styled.div`
    width: 100%;
    height: 10rem;
    margin: 1rem 0;
    padding: 1rem;
    border: 1px solid ${(props) => props.theme.mainColor};
`;
