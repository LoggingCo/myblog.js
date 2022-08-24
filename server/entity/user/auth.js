import Sequelize, { Model } from 'sequelize';

class Auth extends Model {
    static init(sequelize) {
        return super.init(
            {
                authCode: {
                    type: Sequelize.UUID,
                    defaultValue: Sequelize.UUIDV4,
                    allowNull: false,
                    unique: true,
                    comment: '인증 고유번호',
                },
            },
            {
                modelName: 'Auth',
                tableName: 'auths',
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
        db.Auth.belongsTo(db.User, {
            onDelete: 'CASCADE',
        });
    }
}
export default Auth;
