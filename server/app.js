// import lib
import express from 'express';
import dotenv from 'dotenv';
import hpp from 'hpp';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import CookieParser from 'cookie-parser';
import session from 'express-session';
// import  db
import db from './models/index.js';
// import passport
import passport from 'passport';
import passportConfig from './passport/index.js';
// import route
import user from './routes/user/user.js';
import post from './routes/post/post.js';
import image from './routes/post/image.js';
import cment from './routes/post/comment.js';
import room from './routes/chat/room.js';
import chat from './routes/chat/chat.js';
// swagger
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger-output.json';
// import
import SoketServer from './socket/socket.js';

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
            origin: '*',
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
app.use(express.urlencoded({ extended: false }));

// cockie parser
app.use(CookieParser());

// session
app.use(
    session({
        saveUninitialized: false,
        resave: false,
        secret: process.env.SESSION_SECRET_KEY,
        cookie: {
            httpOnly: true,
            secure: false,
        },
    }),
);

// passport
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use('/user', user);
app.use('/post', post);
app.use('/image', image);
app.use('/comment', cment);
app.use('/room', room);
app.use('/chat', chat);

// swagger
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// server
app.set('port', 9000);
const server = app.listen(app.get('port'), () => {
    console.log(`${app.get('port')}번으로 서버 실행 중`, process.env.NODE_ENV);
});

// socket 연결
SoketServer(server);
