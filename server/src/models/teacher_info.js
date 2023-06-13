'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Teacher_info extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Teacher_info.belongsTo(models.User, { foreignKey: 'teacherId', })

            Teacher_info.belongsTo(models.Allcode, { foreignKey: 'priceId', targetKey: 'keyMap', as: 'priceData' })
            Teacher_info.belongsTo(models.Allcode, { foreignKey: 'paymentId', targetKey: 'keyMap', as: 'paymentData' })

            Teacher_info.belongsTo(models.Center, { foreignKey: 'centerId' })
        }
    };
    Teacher_info.init({
        teacherId: DataTypes.INTEGER,
        priceId: DataTypes.STRING,
        description: DataTypes.STRING,
        paymentId: DataTypes.STRING,
        centerId: DataTypes.INTEGER,
        note: DataTypes.STRING,
        rate: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Teacher_info',
        freezeTableName: true
    });
    return Teacher_info;
};