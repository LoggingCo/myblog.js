// import
import express from 'express';
import dotenv from 'dotenv';
import hpp from 'hpp';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import db from './models/index.js';
import passport from 'passport';
import passportConfig from './passport/index.js';
import user from './routes/user/user.js';

// config
const app = express();
passportConfig();
dotenv.config();

// sequelize
db.sequelize
    .sync()
    .then(() => {
        console.log('db 연결 성공');
    })
    .catch(console.error);

// middleware
if (process.env.NODE_ENV === 'production') {
    app.use(morgan('combined'));
    app.use(hpp());
    app.use(
        helmet({
            contentSecurityPolicy: false,
            crossOriginEmbedderPolicy: false,
            crossOriginResourcePolicy: false,
        }),
    );
    app.use(
        cors({
            origin: 'http://myblog.com',
            credentials: true,
        }),
    );
} else {
    app.use(morgan('dev'));
    app.use(
        cors({
            origin: true,
            credentials: true,
        }),
    );
}
// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// passport
app.use(passport.initialize());

// routes
app.use('/user', user);

// server
app.set('port', 9000);
app.listen(app.get('port'), () => {
    console.log(`${app.get('port')}번으로 서버 실행 중`, process.env.NODE_ENV);
});
