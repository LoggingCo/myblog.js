import { PostContentTamplate, PostImgBox } from './style';

const PostContent = ({ content, Images, setZoomModal }) => {
    return (
        <>
            <PostContentTamplate>{content}</PostContentTamplate>
            {Images.length > 0 && (
                <PostImgBox imeage={Images.length === 1}>
                    {Images.length < 3 ? (
                        <>
                            <div>
                                <img src={Images[0]} alt="postImg" />
                            </div>
                            {Images[1] && (
                                <div>
                                    <img src={Images[1]} alt="postImg" />
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            <div>
                                <img src={Images[0]} alt="postImg" />
                            </div>
                            <div
                                className="post_images"
                                onClick={() => setZoomModal((prev) => !prev)}
                            >
                                +<span>{Images.length - 1}개의 사진 더보기</span>
                            </div>
                        </>
                    )}
                </PostImgBox>
            )}
        </>
    );
};
export default PostContent;
