import Sequelize, { Model } from 'sequelize';

class Post extends Model {
    static init(sequelize) {
        return super.init(
            {
                content: {
                    type: Sequelize.TEXT,
                    allowNull: false,
                    comment: '내용',
                },
            },
            {
                modelName: 'Post',
                tableName: 'posts',
                charset: 'utf8mb4',
                collate: 'utf8mb4_general_ci',
                timestamps: true,
                createdAt: true,
                updatedAt: true,
                paranoid: false,
                sequelize,
            },
        );
    }
    static associate(db) {
        // source
        db.Post.hasMany(db.Comment);
        db.Post.hasMany(db.Image);

        // taget
        db.Post.belongsTo(db.User, {
            onDelete: 'CASCADE',
        });
        db.Post.belongsTo(db.User, {
            onDelete: 'CASCADE',
        });

        db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' });
        db.Post.belongsToMany(db.User, { through: 'Like', as: 'likeUser' });
    }
}
export default Post;
