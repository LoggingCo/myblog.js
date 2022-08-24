import { ImgZoomHeader } from './style';

const PostZommHeader = ({ setZoomModal }) => {
    return (
        <ImgZoomHeader>
            <div>이미지 상세보기</div>
            <div>
                <button onClick={() => setZoomModal((prev) => !prev)}>✖</button>
            </div>
        </ImgZoomHeader>
    );
};
export default PostZommHeader;
