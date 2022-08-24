import { useCallback, useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import { FlexibleBox } from '../../../../../style/common';
import { PostFormPreview, PostPreview, PostPreviewIneer } from './style';

export const PostDropzone = ({ files, setFiles }) => {
    const [fileRegist, setFileRegist] = useState(false);

    // drop handler
    const onDropHandler = useCallback((files) => {
        setFiles(
            files.map((file) =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file),
                }),
            ),
        );
        setFileRegist(true);
    }, []);

    useEffect(() => {
        console.log(fileRegist);
    }, [fileRegist]);

    // preview delete
    const onPreviewDelete = useCallback(
        (preview) => {
            const deleteFiles = files.filter((v) => v.preview !== preview);
            setFiles(deleteFiles);
        },
        [files],
    );

    return (
        <Dropzone onDrop={onDropHandler}>
            {({ getRootProps, getInputProps }) => (
                <PostPreview>
                    {files.length > 0 ? (
                        <PostFormPreview>
                            {files.map((v, index) =>
                                files.length < 5 ? (
                                    <PostPreviewIneer key={index}>
                                        <div
                                            className="fileBox"
                                            onClick={() => onPreviewDelete(v.preview)}
                                        >
                                            <img src={v.preview} />
                                            <p>파일 삭제</p>
                                        </div>
                                    </PostPreviewIneer>
                                ) : (
                                    <>
                                        <PostPreviewIneer key={v.name}>
                                            {v === files[files.length - 2] ? (
                                                <FlexibleBox
                                                    fontColor="#00c7ae"
                                                    style={{ width: '4rem' }}
                                                >
                                                    <span>...</span>
                                                </FlexibleBox>
                                            ) : (
                                                v !== files[files.length - 1] && (
                                                    <div
                                                        className="fileBox"
                                                        onClick={() => onPreviewDelete(v.preview)}
                                                    >
                                                        <img src={v.preview} />
                                                        <p>파일 삭제</p>
                                                    </div>
                                                )
                                            )}
                                        </PostPreviewIneer>
                                    </>
                                ),
                            )}
                        </PostFormPreview>
                    ) : (
                        <div className="inputBox" {...getRootProps()}>
                            <input {...getInputProps()} id="file" />+<p>파일을 등록해주세요</p>
                        </div>
                    )}
                </PostPreview>
            )}
        </Dropzone>
    );
};
export default PostDropzone;
