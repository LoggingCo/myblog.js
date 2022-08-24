import SignTamplate from '@components/signCp/tamplate';
import MainLayOut from '@layout/mainLayOut';
import { UserInputTamplate, UserInputForm } from '@style/common';

const SignPage = () => {
    return (
        <MainLayOut>
            <UserInputTamplate>
                <UserInputForm>
                    <SignTamplate />
                </UserInputForm>
            </UserInputTamplate>
        </MainLayOut>
    );
};
export default SignPage;
