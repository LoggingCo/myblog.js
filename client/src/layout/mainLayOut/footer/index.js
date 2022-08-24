import { FooterWrapper, Footertxt, FooterRight, FooterTamplate } from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { useMediaQuery } from 'react-responsive';
import { useMedia } from '@hooks/useMedia';

const LayOutFooter = () => {
    // media qurey
    const { isPc, isTablet, isMobile } = useMedia();

    return (
        <FooterWrapper>
            <FooterTamplate>
                <Footertxt>
                    {isPc && (
                        <pre>
                            SeongYong Kim Group
                            <br />
                            (우) 00000 서울시 용산구 이태원
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            010.1234.1234
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            korpg95274@gmail.com
                            <br />
                            <br />
                            Copyright 2022. KSY©, Ltd. All rights reserved.
                        </pre>
                    )}
                    {isTablet && (
                        <p>
                            SeongYong Kim Group
                            <br />
                            (우) 00000 서울시 용산구 이태원
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            010.1234.1234
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            korpg95274@gmail.com
                            <br />
                            <br />
                            Copyright 2022. KSY©, Ltd. All rights reserved.
                        </p>
                    )}
                    {isMobile && (
                        <p>
                            SeongYong Kim Group
                            <br />
                            (우) 00000 서울시 용산구 이태원 &nbsp;&nbsp; 010.1234.1234
                            <br />
                            <br />
                            Copyright 2022. KSY©, Ltd. <br />
                            All rights reserved.
                        </p>
                    )}
                </Footertxt>
                <FooterRight>
                    {isPc && (
                        <ul>
                            <li>
                                GO ! <span> KSY SNS </span>
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faInstagram} />
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faYoutube} />
                            </li>
                        </ul>
                    )}
                </FooterRight>
            </FooterTamplate>
        </FooterWrapper>
    );
};
export default LayOutFooter;
