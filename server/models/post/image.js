import Sequelize, { Model } from 'sequelize';

class Image extends Model {
    static init(sequelize) {
        return super.init(
            {
                src: {
                    type: Sequelize.STRING(200),
                    comment: '이미지 경로',
                },
            },
            {
                modelName: 'Image',
                tableName: 'images',
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
        db.Image.belongsTo(db.Post, { foreignKey: 'PostId' });
    }
}
export default Image;
