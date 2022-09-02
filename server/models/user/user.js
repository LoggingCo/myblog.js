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
                img: {
                    type: Sequelize.STRING(100),
                    comment: '프로필 이미지',
                },
                smsFlag: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    comment: '문자 홍보 동의 여부',
                },
                acceptFlag: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    comment: '개인정보 보관 동의 여부',
                },
                promtFlag: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    comment: '홍보 이용 동의 여부',
                },
                emailFlag: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    defaultValue: 0,
                    comment: '이메일 인증 여부',
                },
                token: {
                    type: Sequelize.UUID,
                    unique: true,
                    comment: '인증 고유번호',
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
        db.User.hasOne(db.Read);
        db.User.hasOne(db.Blog);

        //1:N
        db.User.hasMany(db.Post);
        db.User.hasMany(db.Comment);
        db.User.hasMany(db.Ben);
        db.User.hasMany(db.Follow, { as: 'following', foreignKey: 'followingId' });
        db.User.hasMany(db.Follow, { as: 'follower', foreignKey: 'followerId' });
    }
}
export default User;
