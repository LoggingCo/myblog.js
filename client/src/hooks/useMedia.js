import { useMediaQuery } from 'react-responsive';
import { size } from '@style/media';

export const useMedia = () => {
    const isPc = useMediaQuery({
        query: `(min-width:${size.desktop})`,
    });
    const isTablet = useMediaQuery({
        query: `(min-width:${size.tablet}) and (max-width:${size.desktop})`,
    });
    const isMobile = useMediaQuery({
        query: `(max-width:${size.mobile}`,
    });

    return { isPc, isTablet, isMobile };
};
