import Sequelize, { Model } from 'sequelize';

class Blog extends Model {
    static init(sequelize) {
        return super.init(
            {
                blogcode: {
                    type: Sequelize.UUID,
                    defaultValue: Sequelize.UUIDV4,
                    allowNull: false,
                    unique: true,
                    comment: '블로그 고유번호',
                },
            },
            {
                modelName: 'Blog',
                tableName: 'blogs',
                charset: 'utf8',
                collate: 'utf8_general_ci',
                timestamps: true,
                createdAt: true,
                updatedAt: true,
                paranoid: false,
                sequelize,
            },
        );
    }
    static associate(db) {
        db.Blog.belongsTo(db.User); //x
    }
}
export default Blog;
