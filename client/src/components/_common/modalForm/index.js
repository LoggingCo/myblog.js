import { BlackBackGround } from '@style/common';
import CommonButton from '../buttonForm';
import { MyBlogModal, CommonModalHeader, ModalInner, ModalButtonBox } from './style';

const CommonModal = ({
    type,
    size,
    width,
    height,
    radius,
    backColor,
    mainColor,
    subColor,
    fontSize,
    title,
    padding,
    children,
    onCancle,
    onSuccess,
}) => {
    return (
        <BlackBackGround>
            <MyBlogModal size={size} width={width} radius={radius} backColor={backColor}>
                <CommonModalHeader mainColor={mainColor} subColor={subColor} fontSize={fontSize}>
                    <div>{title}</div>
                    <div onClick={onCancle}>x</div>
                </CommonModalHeader>
                <ModalInner backColor={backColor} padding={padding} height={height}>
                    {children}
                    {type === 'alert' ? (
                        <ModalButtonBox>
                            <CommonButton
                                type="normal"
                                size="medium"
                                margin="0 0.5rem 0 0"
                                padding="0.2rem"
                                fontSize="0.825rem"
                                onClick={onSuccess}
                            >
                                확인
                            </CommonButton>
                        </ModalButtonBox>
                    ) : (
                        type === 'confirm' && (
                            <ModalButtonBox>
                                <CommonButton
                                    type="normal"
                                    size="small"
                                    margin="0 0.5rem 0 0"
                                    padding="0.2rem"
                                    fontSize="0.825rem"
                                    onClick={onSuccess}
                                >
                                    확인
                                </CommonButton>
                                <CommonButton
                                    type="reverse"
                                    size="small"
                                    padding="0.2rem"
                                    fontSize="0.825rem"
                                    onClick={onCancle}
                                >
                                    취소
                                </CommonButton>
                            </ModalButtonBox>
                        )
                    )}
                </ModalInner>
            </MyBlogModal>
        </BlackBackGround>
    );
};
export default CommonModal;
