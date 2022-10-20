import { Model } from 'sequelize';

class Like extends Model {
    static init(sequelize) {
        return super.init(
            {},
            {
                modelName: 'Like',
                tableName: 'likes',
                charset: 'utf8',
                collate: 'utf8_general_ci',
                timestamps: true,
                createdAt: true,
                updatedAt: false,
                paranoid: false,
                sequelize,
            },
        );
    }
    static associate(db) {
        db.Like.belongsTo(db.User, { foreignKey: 'UserId' });
        db.Like.belongsTo(db.Post, { foreignKey: 'PostId' });
    }
}
export default Like;
