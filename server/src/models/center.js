'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Center extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Center.hasMany(models.Teacher_info, { foreignKey: 'centerId' })
            Center.belongsTo(models.Allcode, { foreignKey: 'provinceId', targetKey: 'keyMap', as: 'provinceData' })
        }
    };
    Center.init({
        name: DataTypes.STRING,
        provinceId: DataTypes.STRING,
        address: DataTypes.STRING,
        description: DataTypes.TEXT,
        image: DataTypes.BLOB('long')
    }, {
        sequelize,
        modelName: 'Center',
    });
    return Center;
};