import { Model } from 'sequelize';

class Follow extends Model {
    static init(sequelize) {
        return super.init(
            {},
            {
                modelName: 'Follow',
                tableName: 'follows',
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
        db.Follow.belongsTo(db.User, { as: 'follower', foreignKey: 'followerId' });
        db.Follow.belongsTo(db.User, { as: 'following', foreignKey: 'followingId' });
    }
}
export default Follow;
