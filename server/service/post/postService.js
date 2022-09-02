import { Op } from 'sequelize';
import Blog from '../../models/blog/blog';
import Follow from '../../models/blog/follow';
import Comment from '../../models/post/comment';
import Hashtag from '../../models/post/hastag';
import Image from '../../models/post/image';
import Like from '../../models/post/like';
import Post from '../../models/post/post';
import PostHashtag from '../../models/post/postHashtag';
import User from '../../models/user/user';
import { FailureData } from '../../util/failureData';
import { SuccessData } from '../../util/successData';

export class PostService {
    // post create
    static async create(req, res, next) {
        try {
            // find hashtags
            const hashtags = req.body.content.match(/#[^\s#]+/g);
            // create post
            const post = await Post.create({
                content: req.body.content,
                UserId: req.user.id,
            });
            // create hashtags
            if (hashtags) {
                const result = await Promise.all(
                    hashtags.map(async (tag) => {
                        const hash = await Hashtag.findOrCreate({
                            where: { name: tag.slice(1).toLowerCase() },
                        });
                        await PostHashtag.create({
                            HashtagId: hash[0].id,
                            PostId: post.id,
                        });
                    }),
                );
            }
            // create images
            if (req.files) {
                if (Array.isArray(req.files)) {
                    const images = await Promise.all(
                        req.files.map((image) => Image.create({ src: image.filename })),
                    );
                    await post.addImages(images);
                } else {
                    const image = await Image.create({ src: req.files[0].filename });
                    await post.addImages(image);
                }
            }

            const fullPost = await Post.findOne({
                where: { id: post.id },
                attributes: {
                    exclude: ['updatedAt'],
                },
                include: [
                    {
                        model: Image,
                        attributes: ['src'],
                    },
                    {
                        model: Comment,
                        include: [
                            {
                                model: User,
                                attributes: ['id', 'nickName', 'img'],
                                include: [{ model: Blog, attributes: ['blogcode'] }],
                            },
                        ],
                    },
                    {
                        model: User,
                        attributes: ['id', 'nickName', 'img'],
                        include: [{ model: Blog, attributes: ['id'] }],
                    },
                    {
                        model: Like,
                        attributes: ['id'],
                        include: [
                            {
                                model: User,
                                attributes: ['id', 'nickName', 'img'],
                                include: [{ model: Blog, attributes: ['id'] }],
                            },
                        ],
                    },
                ],
            });
            res.status(201).json(SuccessData(fullPost));
        } catch (err) {
            console.error(err);
            res.status(403).json(FailureData());
            next(err);
        }
    }

    // my follower post read
    static async readMain(req, res, next) {
        try {
            const user = await User.findOne({ where: { id: req.user.id } });
            const where = {};
            if (parseInt(req.query.lastId, 10)) {
                where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
            }

            const followers = await Follow.findAll({
                where: { followerId: req.user.id },
                attributes: [],
                include: [
                    {
                        model: User,
                        as: 'following',
                        attributes: ['id', 'nickName', 'img'],
                        include: [
                            { model: Blog, attributes: ['id'] },
                            {
                                model: Post,
                                include: [
                                    {
                                        model: Image,
                                        attributes: ['src'],
                                    },
                                    {
                                        model: Comment,
                                        include: [
                                            {
                                                model: User,
                                                attributes: ['id', 'nickName', 'img'],
                                                include: [
                                                    { model: Blog, attributes: ['blogcode'] },
                                                ],
                                            },
                                        ],
                                    },
                                    {
                                        model: User,
                                        attributes: ['id', 'nickName', 'img'],
                                        include: [{ model: Blog, attributes: ['id'] }],
                                    },
                                    {
                                        model: Like,
                                        attributes: ['id'],
                                        include: [
                                            {
                                                model: User,
                                                attributes: ['id', 'nickName', 'img'],
                                                include: [{ model: Blog, attributes: ['id'] }],
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            });
            res.status(201).json(SuccessData(followers));
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    // all post read
    static async readAll(req, res, next) {
        try {
            const where = {};
            if (parseInt(req.query.lastId, 10)) {
                where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
            }
            const fullPost = await Post.findAll({
                order: [['createdAt', 'DESC']],
                attributes: [],
                where,
                include: [
                    {
                        model: User,
                        attributes: ['nickName', 'img'],
                        include: [{ model: Blog, attributes: ['blogcode'] }],
                    },
                    { model: Image, attributes: ['src'] },
                    {
                        model: Comment,
                        include: [
                            {
                                model: User,
                                attributes: ['nickName', 'img'],
                                include: [{ model: Blog, attributes: ['blogcode'] }],
                            },
                        ],
                    },
                    {
                        model: Like,
                        attributes: ['id'],
                        include: [
                            {
                                model: User,
                                attributes: ['id', 'nickName', 'img'],
                                include: [{ model: Blog, attributes: ['id'] }],
                            },
                        ],
                    },
                ],
            });
            res.status(201).json(SuccessData(fullPost));
        } catch (err) {
            console.error(err);
            next(err);
        }
    }

    // my post read
    static async readBlog(req, res, next) {
        try {
            const wherePost = {};
            if (parseInt(req.query.lastId, 10)) {
                wherePost.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
            }
            const fullBLog = await Blog.findOne({
                where: { blogcode: req.params.blogCode },
                attributes: ['blogcode'],
                order: [[User, Post, 'createdAt', 'DESC']],
                include: [
                    {
                        model: User,
                        attributes: ['nickName'],
                        include: [
                            {
                                model: Post,
                                where: wherePost,
                                include: [
                                    {
                                        model: User,
                                        attributes: ['nickName', 'img'],
                                        include: [{ model: Blog, attributes: ['blogcode'] }],
                                    },
                                    { model: Image, attributes: ['src'] },
                                    {
                                        model: Comment,
                                        include: [
                                            {
                                                model: User,
                                                attributes: ['nickName', 'img'],
                                                include: [
                                                    { model: Blog, attributes: ['blogcode'] },
                                                ],
                                            },
                                        ],
                                    },
                                    {
                                        model: User,
                                        as: 'likeUser',
                                        attributes: ['nickName', 'img'],
                                        include: [{ model: Blog, attributes: ['blogcode'] }],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            });
            res.status(201).json(SuccessData(fullBLog.User.Posts));
        } catch (err) {
            console.error(err);
            next(err);
        }
    }

    // post update
    static async update(req, res, next) {
        try {
            console.log(req);
            const hashtags = req.body.content.match(/#[^\s#]+/g);
            await Post.update(
                {
                    content: req.body.content,
                },
                {
                    where: {
                        id: parseInt(req.params.postId, 10),
                        UserId: req.user.id,
                    },
                },
            );

            const post = await Post.findOne({ where: { id: parseInt(req.params.postId, 10) } });
            if (hashtags) {
                const result = await Promise.all(
                    hashtags.map((tag) =>
                        Hashtag.findOrCreate({
                            where: { name: tag.slice(1).toLowerCase() },
                        }),
                    ),
                );
                await post.setHashtags(result.map((v) => v[0]));
            }

            const files = [];
            let editPost = { PostId: parseInt(req.params.postId, 10), content: req.body.content };

            if (req.files && req.files.length > 0) {
                if (Array.isArray(req.files)) {
                    const images = await Promise.all(
                        req.files.map((image) => Image.create({ src: image.filename })),
                    );
                    req.files.map((image) => files.push({ src: image.filename }));
                    await post.addImages(images);
                } else {
                    const image = await Image.create({ src: req.files[0].filename });
                    await post.addImages(image);
                    files.push({ src: req.files[0].filename });
                }
                editPost.Image = files;
            }
            res.status(200).json(SuccessData(editPost));
        } catch (err) {
            console.error(err);
            next(err);
        }
    }

    // post delete
    static async delete(req, res, next) {
        try {
            const post = await Post.findOne({ where: { id: parseInt(req.params.postId, 10) } });
            if (req.user.id === post.UserId) {
                await Post.destroy({
                    where: { id: parseInt(req.params.postId, 10), UserId: req.user.id },
                });
                res.status(200).json(SuccessData(parseInt(req.params.postId, 10)));
            }
            res.status(403).json(FailureData('본인의 게시글만 삭제할 수 있습니다'));
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
}
