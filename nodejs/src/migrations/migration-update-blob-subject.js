module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('subjects', 'image', {
                type: Sequelize.BLOB('long'),
                allowNull: true,
            })
        ])
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('subjects', 'image', {
                type: Sequelize.STRING,
                allowNull: true,
            })
        ])
    }
};