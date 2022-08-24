import Sequelize, { Model } from 'sequelize';

class Chat extends Model {
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
                modelName: 'Chat',
                tableName: 'chats',
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
        db.Chat.hasOne(db.Read);

        db.Chat.belongsTo(db.Room);
        db.Chat.belongsTo(db.User);
    }
}
export default Chat;
