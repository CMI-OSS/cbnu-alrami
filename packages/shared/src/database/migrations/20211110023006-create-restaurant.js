'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('restaurant', {
      restaurant_name: {
        primaryKey: true,
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    food_name: {
        type: DataTypes.STRING(1000),
    },
    date: {
        primaryKey: true,
        type: DataTypes.DATE,
        allowNull: false,
    },
    day: {
        type: DataTypes.STRING(50),
    },
    time: {
        primaryKey: true,
        type: DataTypes.STRING(50),
        allowNull: false,
    }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('restaurant');
  }
};