import Sequelize, { Model } from 'sequelize';

class Hashtag extends Model {
    static init(sequelize) {
        return super.init(
            {
                name: {
                    type: Sequelize.STRING(20),
                    allowNull: false,
                },
            },
            {
                modelName: 'Hashtag',
                tableName: 'hashtags',
                charset: 'utf8',
                collate: 'utf8_general_ci',
                sequelize,
            },
        );
    }
    static associate(db) {
        db.Hashtag.belongsToMany(db.Post, { through: 'PostHashtag' });
    }
}
export default Hashtag;
