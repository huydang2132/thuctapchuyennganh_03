'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Teacher_Info extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Teacher_Info.belongsTo(models.User, { foreignKey: 'teacherId', })

            Teacher_Info.belongsTo(models.Allcode, { foreignKey: 'priceId', targetKey: 'keyMap', as: 'priceData' })
            Teacher_Info.belongsTo(models.Allcode, { foreignKey: 'paymentId', targetKey: 'keyMap', as: 'paymentData' })
            Teacher_Info.belongsTo(models.Allcode, { foreignKey: 'provinceId', targetKey: 'keyMap', as: 'provinceData' })
        }
    };
    Teacher_Info.init({
        teacherId: DataTypes.INTEGER,
        priceId: DataTypes.STRING,
        provinceId: DataTypes.STRING,
        paymentId: DataTypes.STRING,
        addressCenter: DataTypes.STRING,
        nameCenter: DataTypes.STRING,
        note: DataTypes.STRING,
        rate: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Teacher_Info',
        freezeTableName: true
    });
    return Teacher_Info;
};