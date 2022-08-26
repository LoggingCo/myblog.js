import passport from 'passport';
import jwt from 'jsonwebtoken';
import { v4 } from 'uuid';
import User from '../../models/user/user.js';
import Blog from '../../models/blog/blog.js';

export class UserService {
    auth(req, res, next) {
        passport.authenticate('jwt', { session: false }, (err, user) => {
            if (err || !user) {
                if (req.cookies.refresh) {
                    const user = async () => {
                        return await User.findOne({ where: { userNumber: auth.UserId } });
                    };
                    const token = jwt.sign({ id: user().id }, SECRET_JWT_TOKEN_KEY);
                    res.header('authorization', token);

                    req.user = user();
                } else {
                    return () => {
                        console.log(err);
                        next(err);
                    };
                }
            }
            return next();
        });
    }

    async login(req, res, next) {
        await passport.authenticate('local', (err, user, info) => {
            if (err) {
                console.error(err);
                return next(err);
            }
            if (info) {
                return res.status(401).send(info);
            }
            return req.login(user, async (loginErr) => {
                if (loginErr) {
                    console.log(loginErr);
                    return nexr(loginErr);
                } else {
                    const token = jwt.sign({ id: user.id }, SECRET_JWT_TOKEN_KEY);
                    res.header('authorization', { token: token, expire: 60 * 60000 });

                    const userData = await User.findOne({
                        where: { id: user.id },
                        attributes: {
                            include: ['nickanme', 'emailFlag'],
                        },
                    });
                    const blogData = await Blog.findOne({ where: { UserId: user.id } });
                    const fullUser = {
                        ...userData.dataValues,
                        blogIDx: blogData.id,
                    };
                    res.status(200).json(fullUser);
                }
            });
        })(req, res, next);
    }

    async sign(req, res, next) {
        console.log(req, res, next);
    }
}
