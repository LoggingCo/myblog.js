import Ben from '../../models/blog/ben';
import Blog from '../../models/blog/blog';
import Follow from '../../models/blog/follow';
import Post from '../../models/post/post';
import User from '../../models/user/user';
import { BlodCodeUser } from '../../util/blogCodeUser';
import { FailureData, SuccessData } from '../../util/resultData';

export class BlogService {
    // addfollow
    static async addFollow(req, res, next) {
        try {
            const user = await BlodCodeUser(req.body.blodcode);
            if (user) {
                return res.status(400).json(FailureData('존재하지 않는 유저입니다.'));
            }
            await Follow.create({
                followingId: user.id,
                followerId: req.user.id,
            });

            const fullUser = await User.findOne({
                where: { id: user.id },
                attributes: ['nickName', 'img'],
                include: [{ model: Blog, attributes: ['blogcode'] }],
            });
            res.status(400).json(SuccessData(fullUser));
        } catch (err) {
            console.error(err);
            next(err);
        }
    }

    // addben
    static async addBen(req, res, next) {
        try {
            const user = await BlodCodeUser(req.body.blodcode);

            if (!user) {
                return res.status(400).json(FailureData('존재하지 않는 유저입니다.'));
            }

            await Ben.create({
                BenId: user.id,
                UserId: req.user.id,
            });

            const fullUser = await User.findOne({
                where: { id: user.id },
                attributes: ['nickName', 'img'],
                include: [{ model: Blog, attributes: ['blogcode'] }],
            });
            res.status(400).json(SuccessData(fullUser));
        } catch (err) {
            console.error(err);
            next(err);
        }
    }

    // readinfo
    static async readInfo(req, res, next) {
        try {
            const user = await BlodCodeUser(req.body.blodcode);

            if (!user.id) {
                return res.status(400).json(FailureData('존재하지 않는 유저입니다.'));
            }

            // 팔로윙길이, 팔로위길이 벤길이, 총게시물 길이, 차단여부, 팔로윙여부, 내 블로그 유무
            const following = await Follow.findAll({});
            const follower = await Follow.findAllAll({});
            const ben = await Ben.findAll({});
            const post = await Post.findAll({});

            // 블로그의 각 정보 별 길이 응답
            // 단 내가 내 자신을 팔로윙 팔로워 중이므로 -1을 한다
            const fullBlog = {
                user: user,
                followingCount: following.length - 1,
                followerCount: follower.length - 1,
                benCount: ben.length,
                postCount: post.length,
            };

            res.status(200).json(SuccessData(fullBlog));
        } catch (err) {
            console.error(err);
            next(err);
        }
    }

    // readben
    static readBen(req, res, next) {
        try {
            const user = await BlodCodeUser(req.body.blodcode);
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
    // readfollwing
    static readFollwing(req, res, next) {
        try {
            const user = await BlodCodeUser(req.body.blodcode);

            // 현재 내가 팔로우 중인가
            // 나를 팔로우 중인데 내가 팔로우 하지 않았는가
            // 추천 친구
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
    //readfollow
    static readFollow(req, res, next) {
        try {
            const user = await BlodCodeUser(req.body.blodcode);

            // 현재 내가 팔로우 중인가
            // 나를 팔로우 중인데 내가 팔로우 하지 않았는가
            // 추천 친구
        } catch (err) {
            console.error(err);
            next(err);
        }
    }

    // deletefollow
    static deleteFollow(req, res, next) {
        try {
            const user = await BlodCodeUser(req.body.blodcode);
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
    // deleteben
    static deleteBen(req, res, next) {
        try {
            const user = BlodCodeUser(req.body.blodcode);
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
}
