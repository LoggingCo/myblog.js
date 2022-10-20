import Sequelize, { Model } from 'sequelize';

class Room extends Model {
    static init(sequelize) {
        return super.init(
            {
                roomCode: {
                    type: Sequelize.STRING(200),
                    allowNull: false,
                    unique: true,
                    comment: '방번호',
                },
                roomType: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    defaultValue: 0,
                    comment: '개인 단체 여부',
                },
            },
            {
                modelName: 'Room',
                tableName: 'rooms',
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
        db.Room.hasMany(db.Read);
        db.Room.hasMany(db.Chat);
        db.Room.hasMany(db.RoomUser, { foreignKey: 'RoomId' });
    }
}
export default Room;
