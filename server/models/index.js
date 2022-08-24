import Sequelize from 'sequelize';
import post from './post/post.js';
import comment from './post/comment.js';
import hashtag from './post/hastag.js';
import image from './post/image.js';
import user from './user/user.js';
import auth from './user/auth.js';
import read from './chat/read.js';
import chat from './chat/chat.js';
import room from './chat/room.js';
import blog from './blog/blog.js';
import config from '../config/config.js';

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];
const db = {};

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);

db.Post = post;
db.Comment = comment;
db.Hashtag = hashtag;
db.Image = image;
db.User = user;
db.Auth = auth;
db.Read = read;
db.Chat = chat;
db.Room = room;
db.Blog = blog;

Object.keys(db).forEach((modelName) => {
    db[modelName].init(sequelize);
});

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
