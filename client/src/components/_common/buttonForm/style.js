import styled from 'styled-components';
import { media } from '../../../style/media';

export const MyBlogBoutton = styled.button`
    font-size: 0.825rem;
    /* box-shadow: 0 8px 16px 0 rgb(0 0 0 / 24%); */

    width: ${(props) =>
        props.width
            ? props.width
            : props.size === 'small'
            ? '4rem'
            : props.size === 'medium'
            ? '7rem'
            : props.size === 'big'
            ? '10rem'
            : props.size === 'full' && '100%'};

    ${(props) => (props.height ? `height: ${props.height}` : 'aspect-ratio: 5 / 1')};
    opacity: ${(props) => props.disabled && '0.3'};

    background-color: ${(props) =>
        props.mainColor
            ? props.mainColor
            : props.type === 'normal'
            ? props.theme.mainColor
            : props.type === 'reverse' && props.theme.subColor};

    color: ${(props) =>
        props.subColor
            ? props.subColor
            : props.type === 'normal'
            ? props.theme.subColor
            : props.type === 'reverse' && props.theme.mainColor};

    border: 1px solid
        ${(props) =>
            props.border === false
                ? 'none'
                : props.mainColor
                ? props.mainColor
                : props.type === 'normal'
                ? 'none'
                : props.type === 'reverse' && props.theme.mainColor};

    border-radius: ${(props) => props.radius && props.radius};

    margin: ${(props) => props.margin && props.margin};
    padding: ${(props) => props.padding && props.padding};
    cursor: pointer;

    :hover {
        opacity: ${(props) => (props.disabled ? '0.3' : '0.6')};
    }

    @media screen and (max-width: 767px) {
        font-size: ${(props) =>
            props.fontSize ? `calc(${props.fontSize} * 0.8)` : `calc(1rem * 0.8)`};
    }

    @media screen and (min-width: 768px) and (max-width: 1024px) {
        font-size: ${(props) =>
            props.fontSize ? `calc(${props.fontSize} * 0.8)` : `calc(1rem * 0.9)`};
    }
`;
