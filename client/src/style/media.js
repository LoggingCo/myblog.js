import { css } from 'styled-components';

export const size = {
    mobile: '767px',
    tablet: '768px',
    desktop: '1024px',
};

export const media = {
    mobile: (...args) =>
        css`
            @media screen and (max-width: ${size.mobile}px) {
                ${css(...args)}
            }
        `,
    tablet: (...args) =>
        css`
            @media screen and(min-width:  ${size.tablet}px) and (max-width: ${size.desktop}px) {
                ${css(...args)}
            }
        `,
    desktop: (...args) =>
        css`
            @media screen and (min-width: ${size.desktop}px) {
                ${css(...args)}
            }
        `,
};
