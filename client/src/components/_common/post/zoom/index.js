import PostZommHeader from './header';
import PostZommPage from './page';
import { ImgZoomSlide } from './style';
import { BlackBackGround } from '@style/common';
import { useRef } from 'react';

const PostZoom = ({ setZoomModal, Images }) => {
    const ImageBoxRef = useRef(null);

    return (
        <>
            <BlackBackGround>
                <PostZommHeader setZoomModal={setZoomModal} />
                <ImgZoomSlide>
                    <ul ref={ImageBoxRef}>
                        {Images.map((v) => (
                            <li>
                                <img src={v} />
                            </li>
                        ))}
                    </ul>
                    <PostZommPage ImagesIndex={Images.length} ImageBoxRef={ImageBoxRef} />
                </ImgZoomSlide>
            </BlackBackGround>
        </>
    );
};
export default PostZoom;
