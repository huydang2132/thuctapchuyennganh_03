'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Booking extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Booking.belongsTo(models.Allcode, { foreignKey: 'dateType', targetKey: 'keyMap', as: 'dateTypeBookingData' })
            Booking.belongsTo(models.Allcode, { foreignKey: 'statusId', targetKey: 'keyMap', as: 'statusData' })

            Booking.belongsTo(models.User, { foreignKey: 'studentId' })
        }
    };
    Booking.init({
        statusId: DataTypes.STRING,
        teacherId: DataTypes.INTEGER,
        studentId: DataTypes.INTEGER,
        date: DataTypes.STRING,
        dateType: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Booking',
    });
    return Booking;
};