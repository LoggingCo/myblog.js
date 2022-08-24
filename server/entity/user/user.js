import Sequelize, { Model } from 'sequelize';

class User extends Model {
    static init(sequelize) {
        return super.init(
            {
                email: {
                    type: Sequelize.STRING(30),
                    allowNull: false,
                    unique: true,
                    comment: '이메일',
                },
                nickName: {
                    type: Sequelize.STRING(30),
                    allowNull: false,
                    comment: '닉네임',
                },
                password: {
                    type: Sequelize.STRING(100),
                    allowNull: false,
                    comment: '비밀번호',
                },
                hpNumber: {
                    type: Sequelize.STRING(30),
                    allowNull: false,
                    comment: '전화번호',
                },
                smsFlag: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    defaultValue: 0,
                    comment: '문자 홍보 동의 여부',
                },
                acceptFlag: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    defaultValue: 0,
                    comment: '개인정보 보관 동의 여부',
                },
                promtFlag: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    defaultValue: 0,
                    comment: '홍보 이용 동의 여부',
                },
                emailFlag: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    defaultValue: 0,
                    comment: '이메일 인증 여부',
                },
            },
            {
                modelName: 'User',
                tableName: 'users',
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
        //1:1
        db.User.hasOne(db.Auth);
        db.User.hasOne(db.Read);

        //1:N
        db.User.hasMany(db.Post);
        db.User.hasMany(db.Comment);
        db.User.hasMany(db.Chat);

        db.User.belongsToMany(db.Post, { through: 'Like', as: 'likeUser' });
        db.User.belongsToMany(db.User, {
            through: 'Follow',
            as: 'follower',
            foreignKey: 'followerId',
        });
        db.User.belongsToMany(db.User, {
            through: 'Follow',
            as: 'following',
            foreignKey: 'followingId',
        });
        db.User.belongsToMany(db.User, {
            through: 'Ben',
            as: 'benUser',
            foreignKey: 'benUserId',
        });
        db.User.belongsToMany(db.User, {
            through: 'Ben',
            as: 'offerUser',
            foreignKey: 'offerUserId',
        });
        db.User.belongsToMany(db.Room, { through: 'roomUser', as: 'JoinUser' });
    }
}
export default User;
