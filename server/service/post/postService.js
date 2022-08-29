import { Op } from 'sequelize';
import Blog from '../../models/blog/blog';
import Comment from '../../models/post/comment';
import Hashtag from '../../models/post/hastag';
import Image from '../../models/post/image';
import Post from '../../models/post/post';
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
                    hashtags.map((tag) =>
                        Hashtag.findOrCreate({
                            where: { name: tag.slice(1).toLowerCase() },
                        }),
                    ),
                );
                await post.addHashtags(result.map((v) => v[0]));
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
                        model: User,
                        as: 'likeUser',
                        attributes: ['id'],
                    },
                ],
            });
            res.status(201).json(SuccessData(fullPost));
        } catch (err) {
            console.error(err);
            next(err);
            res.status(403).json(FailureData());
        }
    }

    // my follower post read
    static async read(req, res, next) {
        try {
            const user = await User.findOne({ where: { id: req.user.id } });
            const where = {};
            if (parseInt(req.query.lastId, 10)) {
                where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
            }
            const followers = await user.getFollowing({
                where,
                attributes: [],
                order: [[Post, 'createdAt', 'DESC']],
                include: [
                    {
                        model: Post,
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
                                model: User,
                                as: 'likeUser',
                                attributes: ['nickName', 'img'],
                                include: [{ model: Blog, attributes: ['blogcode'] }],
                            },
                        ],
                    },
                ],
            });
            res.status(201).json(SuccessData(followers[0].Posts));
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
                        model: User,
                        as: 'likeUser',
                        attributes: ['nickName', 'img'],
                        include: [{ model: Blog, attributes: ['blogcode'] }],
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
    static async update(req, res, next) {}

    // post delete
    static async delete(req, res, next) {}
}
