import { Link } from 'react-router-dom';
import CommonButton from '../../buttonForm';
import { NotFountWrapper } from './style';

const NotFountPage = () => {
    return (
        <NotFountWrapper>
            <h1>404</h1>
            <p>We can't find that page.</p>
            <Link to="/">
                <CommonButton type="normal" size="medium" radius="1rem">
                    Home
                </CommonButton>
            </Link>
        </NotFountWrapper>
    );
};
export default NotFountPage;
