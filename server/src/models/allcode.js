'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Allcode extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Allcode.hasMany(models.User, { foreignKey: 'positionId', as: 'positionData' })
            Allcode.hasMany(models.User, { foreignKey: 'gender', as: 'genderData' })
            Allcode.hasMany(models.User, { foreignKey: 'roleId', as: 'roleData' })
            Allcode.hasMany(models.Schedule, { foreignKey: 'dateType', as: 'dateTypeData' })

            Allcode.hasMany(models.Teacher_info, { foreignKey: 'priceId', as: 'priceData' })
            Allcode.hasMany(models.Teacher_info, { foreignKey: 'paymentId', as: 'paymentData' })
            Allcode.hasMany(models.Center, { foreignKey: 'provinceId', as: 'provinceData' })

            Allcode.hasMany(models.Booking, { foreignKey: 'dateType', as: 'dateTypeBookingData' })
            Allcode.hasMany(models.Booking, { foreignKey: 'statusId', as: 'statusData' })
        }
    };
    Allcode.init({
        keyMap: DataTypes.STRING,
        type: DataTypes.STRING,
        value: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Allcode',
    });
    return Allcode;
};