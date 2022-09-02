import { Model } from 'sequelize';

class PostHashtag extends Model {
    static init(sequelize) {
        return super.init(
            {},
            {
                modelName: 'PostHashtag',
                tableName: 'postHashtags',
                charset: 'utf8mb4',
                collate: 'utf8mb4_general_ci',
                timestamps: true,
                createdAt: true,
                updatedAt: false,
                paranoid: false,
                sequelize,
            },
        );
    }
    static associate(db) {
        db.PostHashtag.belongsTo(db.Hashtag);
        db.PostHashtag.belongsTo(db.Post);
    }
}
export default PostHashtag;
