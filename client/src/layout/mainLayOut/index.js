import LayOutFooter from './footer';
import LayOutHeader from './header';
import { useMedia } from '@hooks/useMedia';

const MainLayOut = ({ children }) => {
    // media qurey
    const { isPc } = useMedia();

    return (
        <div>
            <LayOutHeader />
            <div style={isPc ? { paddingTop: '4rem' } : { paddingTop: '8rem' }}>{children}</div>
            <LayOutFooter />
        </div>
    );
};
export default MainLayOut;
