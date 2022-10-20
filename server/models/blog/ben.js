import { Model } from 'sequelize';

class Ben extends Model {
    static init(sequelize) {
        return super.init(
            {},
            {
                modelName: 'Ben',
                tableName: 'bens',
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
        db.Ben.belongsTo(db.User, { as: 'ben', foreignKey: 'BenId' });
        db.Ben.belongsTo(db.User, { foreignKey: 'UserId' });
    }
}
export default Ben;
