'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Teacher_info', {
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
            description: {
                allowNull: false,
                type: Sequelize.STRING
            },
            paymentId: {
                allowNull: false,
                type: Sequelize.STRING
            },
            centerId: {
                allowNull: false,
                type: Sequelize.INTEGER
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
        await queryInterface.dropTable('Teacher_info');
    }
};