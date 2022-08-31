import passport from 'passport';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 } from 'uuid';
import User from '../../models/user/user.js';
import Blog from '../../models/blog/blog.js';
import { FailureData } from '../../util/failureData.js';
import { SuccessData } from '../../util/successData.js';
import dotenv from 'dotenv';
dotenv.config();

export class UserService {
    // login
    static async login(req, res, next) {
        try {
            await User.update({ token: v4() }, { where: { email: req.body.email } });
            await passport.authenticate('local', (err, user, info) => {
                if (err) {
                    console.error(err);
                    return next(err);
                }
                if (info) {
                    return res.status(401).json(info);
                }
                return req.login(user, async (loginErr) => {
                    if (loginErr) {
                        console.log(loginErr);
                        return next(loginErr);
                    } else {
                        const token = jwt.sign({ id: user.id }, process.env.SECRET_JWT_TOKEN_KEY);

                        const refresh = jwt.sign(
                            { token: user.token },
                            process.env.SECRET_REFRESH_TOKEN_KEY,
                        );

                        const fullUser = await User.findOne({
                            where: { id: user.id },
                            attributes: ['nickname', 'img'],
                            include: [
                                {
                                    model: Blog,
                                    attributes: ['blogcode'],
                                },
                            ],
                        });

                        res.cookie('refresh', refresh, {
                            maxAge: 14 * 24 * 60 * 60000,
                            httpOnly: true,
                        });

                        res.header('authorization', {
                            token: token,
                            expire: 60 * 60000,
                        });
                        res.status(200).json(SuccessData(fullUser));
                    }
                });
            })(req, res, next);
        } catch (err) {
            console.error(err);
            next(err);
        }
    }

    // signup
    static async sign(req, res, next) {
        try {
            const exUser = await User.findOne({
                where: {
                    email: req.body.email,
                },
            });
            if (exUser) {
                return res.status(403).send(FailureData('이미 사용중인 이메일입니다.'));
            }
            const hashedPassword = await bcrypt.hash(req.body.password, 12);
            await User.create({
                email: req.body.email,
                nickName: req.body.nickName,
                password: hashedPassword,
                hpNumber: req.body.hpNumber,
                smsFlag: req.body.smsFlag,
                promtFlag: req.body.promtFlag,
                acceptFlag: req.body.acceptFlag,
            });
            const user = await User.findOne({ where: { email: req.body.email } });
            await user.addFollowing(user.id);
            await Blog.create({
                UserId: user.id,
            });

            res.status(201).json(SuccessData());
        } catch (err) {
            console.error(err);
            next(err);
        }
    }

    // logout
    static async logout(req, res, next) {
        req.logout((err) => {
            if (err) {
                console.error(err);
                next(err);
                return res.status(401).json(FailureData);
            }
            req.session.destroy();
            res.clearCookie('refresh');
            res.clearCookie('connect.sid');
            res.status(201).json(SuccessData());
        });
    }
}
