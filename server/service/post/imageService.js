import Image from '../../models/post/image';
import Post from '../../models/post/post';
import { FailureData } from '../../util/failureData';
import { SuccessData } from '../../util/successData';

export class ImageService {
    // post image delete
    static async deletePost(req, res, next) {
        try {
            const post = await Post.findOne({ where: { id: parseInt(req.params.imageId, 10) } });
            console.log(post);
            if (post.UserId === req.user.id) {
                await Image.destroy({
                    where: {
                        id: parseInt(req.params.imageId, 10),
                        PostId: parseInt(req.params.postId, 10),
                    },
                });
                res.status(200).json(SuccessData(parseInt(req.params.imageId, 10)));
            }
            res.status(403).json(FailureData('본인 게시글의 이미지만 삭제할 수 있습니다'));
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
}
