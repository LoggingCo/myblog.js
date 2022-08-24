import CommonButton from '@components/_common/buttonForm';

const OauthButton = () => {
    return (
        <>
            <CommonButton
                type="normal"
                size="full"
                height="2rem"
                margin="0.5rem 0 0.3rem 0"
                fontSize="0.825rem"
                mainColor="#03c75a"
                subColor="#ffffff"
            >
                네이버로 로그인
            </CommonButton>
            <CommonButton
                type="normal"
                size="full"
                height="2rem"
                margin="0.3rem 0"
                fontSize="0.825rem"
                mainColor="#fee500"
                subColor="#000000"
            >
                카카오로 로그인
            </CommonButton>
            <CommonButton
                type="normal"
                size="full"
                height="2rem"
                margin="0.3rem 0"
                fontSize="0.825rem"
                mainColor="#000000"
                subColor="#ffffff"
            >
                Apple로 로그인
            </CommonButton>
        </>
    );
};
export default OauthButton;
