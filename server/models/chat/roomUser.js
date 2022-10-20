import { Model } from 'sequelize';

class RoomUser extends Model {
    static init(sequelize) {
        return super.init(
            {},
            {
                modelName: 'RoomUser',
                tableName: 'roomUsers',
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
        db.RoomUser.belongsTo(db.User, { foreignKey: 'RoomUserId' });
        db.RoomUser.belongsTo(db.Room, { foreignKey: 'RoomId' });
    }
}
export default RoomUser;
