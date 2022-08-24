import Sequelize, { Model } from 'sequelize';

class Read extends Model {
    static init(sequelize) {
        return super.init(
            {},
            {
                modelName: 'Read',
                tableName: 'reads',
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
        db.Read.belongsTo(db.Room);
        db.Read.belongsTo(db.User, {
            onDelete: 'CASCADE',
        });
        db.Read.belongsTo(db.Chat);
    }
}
export default Read;
