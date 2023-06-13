'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Teacher_subject extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Teacher_subject.init({
        teacherId: DataTypes.INTEGER,
        centerId: DataTypes.INTEGER,
        subjectId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Teacher_subject',
    });
    return Teacher_subject;
};