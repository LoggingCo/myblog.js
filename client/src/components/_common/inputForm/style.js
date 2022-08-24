import styled from 'styled-components';

export const MyBlogInput = styled.input`
    width: ${(props) => props.width && props.width};
    height: ${(props) => props.height && props.height};
    font-size: ${(props) => props.fontSize};
    border: ${(props) => (props.borderWidth ? props.borderWidth : '1px')} solid
        ${(props) => (props.borderColor ? props.borderColor : props.theme.mainColor)};
    border-radius: ${(props) => props.radius && props.radius};
    margin: ${(props) => props.margin && props.margin};
    padding: ${(props) => props.padding && props.padding};

    :focus {
        outline: none;
        border: 1px solid ${(props) => props.theme.mainColor};
        box-shadow: 0 0 0 0.1rem rgb(59 65 99 / 25%);
    }

    ::placeholder {
        color: #ccc;
    }

    @media screen and (max-width: 767px) {
        font-size: ${(props) =>
            props.fontSize ? `calc(${props.fontSize} * 0.8)` : `calc(1rem * 0.8)`};
    }

    @media screen and (min-width: 768px) and (max-width: 1024px) {
        font-size: ${(props) =>
            props.fontSize ? `calc(${props.fontSize} * 0.8)` : `calc(1rem * 1)`};
    }
`;

export const MyblogTextArea = styled.textarea`
    resize: none;
    width: ${(props) => props.width && props.width};
    height: ${(props) => props.height && props.height};
    font-size: ${(props) => props.fontSize};
    border: ${(props) => (props.borderWidth ? props.borderWidth : '1px')} solid
        ${(props) => (props.borderColor ? props.borderColor : props.theme.mainColor)};
    border-radius: ${(props) => props.radius && props.radius};
    margin: ${(props) => props.margin && props.margin};
    padding: ${(props) => props.padding && props.padding};

    :focus {
        outline: none;
        border: ${(props) => (props.borderWidth ? props.borderWidth : '1px')} solid
            ${(props) => (props.borderColor ? props.borderColor : props.theme.mainColor)};
        box-shadow: 0 0 0 0.1rem rgb(59 65 99 / 25%);
    }

    ::placeholder {
        color: #ccc;
    }

    @media screen and (max-width: 767px) {
        font-size: ${(props) =>
            props.fontSize ? `calc(${props.fontSize} * 0.8)` : `calc(1rem * 0.8)`};
    }

    @media screen and (min-width: 768px) and (max-width: 1024px) {
        font-size: ${(props) =>
            props.fontSize ? `calc(${props.fontSize} * 0.8)` : `calc(1rem * 1)`};
    }
`;
