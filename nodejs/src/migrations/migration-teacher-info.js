'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('teacher_info', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            teacherId: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            priceId: {
                allowNull: false,
                type: Sequelize.STRING
            },
            provinceId: {
                allowNull: false,
                type: Sequelize.STRING
            },
            paymentId: {
                allowNull: false,
                type: Sequelize.STRING
            },
            addressCenter: {
                allowNull: false,
                type: Sequelize.STRING
            },
            nameCenter: {
                allowNull: false,
                type: Sequelize.STRING
            },
            note: {
                type: Sequelize.STRING
            },
            rate: {
                allowNull: false,
                defaultValue: 0,
                type: Sequelize.INTEGER
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('teacher_info');
    }
};