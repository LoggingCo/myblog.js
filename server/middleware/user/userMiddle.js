import passport from 'passport';
import dotenv from 'dotenv';
import { RefreshAuth } from '../../util/refreshAuth';
import { FailureData } from '../../util/resultData.js';
import jwt from 'jsonwebtoken';
import { UserService } from '../../service/user/userService';
dotenv.config();

export class UserMiddleware {
    static isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            next();
        } else {
            res.status(401).send('로그인이 필요합니다.');
        }
    }

    static isNotLoggedIn(req, res, next) {
        if (!req.isAuthenticated()) {
            next();
        } else {
            res.status(401).send('로그인하지 않은 사용자만 접근 가능합니다.');
        }
    }

    static jwtAuth(req, res, next) {
        passport.authenticate('jwt', { session: false }, (err, user) => {
            // jwt x
            if (err || !user) {
                // refresh o jwt x
                // jwt reissue
                if (req.cookies.refresh) {
                    const refreshAuth = RefreshAuth(req.cookies.refresh, req.user);
                    if (refreshAuth) {
                        const token = jwt.sign(
                            { id: req.user.id },
                            process.env.SECRET_JWT_TOKEN_KEY,
                        );
                        console.log('refresh');
                        res.header('authorization', token);
                        return next();
                    }
                    res.status(403).json(FailureData('인증정보가 올바르지 않습니다'));
                    UserService.logout(req, res, next);
                } else {
                    // refresh x jwt x
                    console.log('none');
                    res.status(403).json(FailureData('세션이 만료되었습니다'));
                    UserService.logout(req, res, next);
                }
            }
            // jwt o refresh o
            if (req.cookies.refresh) {
                const refreshAuth = RefreshAuth(req.cookies.refresh, user);
                if (refreshAuth) {
                    console.log('refresh jwt');
                    return next();
                }
                res.status(403).json(FailureData('인증정보가 올바르지 않습니다'));
                UserService.logout(req, res, next);
            }
            // jwt o refresh x
            // refresh reissue
            const refresh = jwt.sign({ token: user.token }, process.env.SECRET_REFRESH_TOKEN_KEY);
            console.log('jwt');
            res.cookie('refresh', refresh, {
                maxAge: 14 * 24 * 60 * 60000,
                httpOnly: true,
            });
            next();
        })(req, res, next);
    }
    catch(err) {
        console.log(err);
        next(err);
    }
}
