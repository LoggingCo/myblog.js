import Blog from '../../models/blog/blog';
import Comment from '../../models/post/comment';
import User from '../../models/user/user';
import { SuccessData } from '../../util/successData';

export class CmentService {
    // cment create
    static async create(req, res, next) {
        try {
            const comment = await Comment.create({
                content: req.body.content,
                PostId: parseInt(req.params.postId, 10),
                UserId: req.user.id,
            });
            const fullComment = await Comment.findOne({
                where: { id: comment.id },
                include: [
                    {
                        model: User,
                        attributes: ['id', 'nickName', 'img'],
                        include: [{ model: Blog, attributes: ['blogcode'] }],
                    },
                ],
            });
            res.status(200).json(SuccessData(fullComment));
        } catch (err) {
            console.error(err);
            next(err);
        }
    }

    // cment delete
    static async delete(req, res, next) {
        try {
            await Comment.destroy({
                where: {
                    id: parseInt(req.params.commentId, 10),
                    UserId: req.user.id,
                    PostId: parseInt(req.params.postId, 10),
                },
            });
            res.status(200).json(SuccessData(parseInt(req.params.commentId, 10)));
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
}
