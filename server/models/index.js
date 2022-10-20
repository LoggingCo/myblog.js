import Sequelize from 'sequelize';
import post from './post/post.js';
import comment from './post/comment.js';
import hashtag from './post/hastag.js';
import image from './post/image.js';
import user from './user/user.js';
import read from './chat/read.js';
import chat from './chat/chat.js';
import room from './chat/room.js';
import blog from './blog/blog.js';
// through table
import RoomUser from './chat/roomUser.js';
import Like from './post/like.js';
import PostHashtag from './post/postHashtag.js';
import Ben from './blog/ben.js';
import Follow from './blog/follow.js';
// 
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
db.Read = read;
db.Chat = chat;
db.Room = room;
db.Blog = blog;
// through table
db.RoomUser = RoomUser;
db.Like = Like;
db.PostHashtag = PostHashtag;
db.Ben = Ben;
db.Follow = Follow;

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
