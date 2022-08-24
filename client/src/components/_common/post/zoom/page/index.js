import { ImgZoomPage } from './style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { useCallback, useEffect, useRef, useState } from 'react';

const PostZommPage = ({ ImagesIndex, ImageBoxRef }) => {
    const ImageInex = useRef(ImagesIndex);
    const [ImageCurrent, setImageCureent] = useState(1);

    const onPrevImageHandler = useCallback(() => {
        if (ImageCurrent > 1) {
            setImageCureent((prev) => prev - 1);
        }
    }, [ImageCurrent]);

    const onNextImageHandler = useCallback(() => {
        if (ImageCurrent < ImageInex.current) {
            setImageCureent((prev) => prev + 1);
        }
    }, [ImageCurrent]);

    useEffect(() => {
        if (ImageCurrent > 0) {
            const page = ImageCurrent - 1;
            const clientWidth = ImageBoxRef.current.clientWidth;
            ImageBoxRef.current.style.transform = `translateX(-${page * clientWidth}px)`;
        }
    }, [ImageCurrent]);

    return (
        <ImgZoomPage>
            <div className="img_zoom_prev" onClick={onPrevImageHandler}>
                <FontAwesomeIcon icon={faAngleLeft} />
            </div>
            <div style={{ whiteSpace: 'pre' }}>
                {ImageCurrent} / {ImageInex.current}
            </div>
            <div className="img_zoom_next" onClick={onNextImageHandler}>
                <FontAwesomeIcon icon={faAngleRight} />
            </div>
        </ImgZoomPage>
    );
};
export default PostZommPage;
