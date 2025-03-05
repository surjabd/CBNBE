'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Courses', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      author: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      curricullum: {
        type: Sequelize.ENUM('0-Levels', 'AS-Levels', 'A2-Levels', 'IGCSE'),
        allowNull: false
      },
      subject: {
        type: Sequelize.ENUM('Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science'),
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('Active', 'Inactive'),
        allowNull: false
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      acceptCoupon: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      published: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Courses');
  }
};