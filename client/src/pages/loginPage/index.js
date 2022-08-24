import OauthButton from '@components/loginCp/oauthButton/index';
import LoginTampLate from '@components/loginCp/tamplate';
import MainLayOut from '@layout/mainLayOut';
import { UserInputTamplate, UserInputForm } from '@style/common';

const LoginPage = () => {
    return (
        <MainLayOut>
            <UserInputTamplate type="login">
                <UserInputForm>
                    <LoginTampLate />
                    <OauthButton />
                </UserInputForm>
            </UserInputTamplate>
        </MainLayOut>
    );
};
export default LoginPage;
