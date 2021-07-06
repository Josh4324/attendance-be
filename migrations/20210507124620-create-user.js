'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      brandName: {
        type: Sequelize.STRING
      },
      websiteUrl: {
        type: Sequelize.STRING
      },
      picture: {
        type: Sequelize.STRING
      },
      creating: {
        type: Sequelize.STRING
      },
      about: {
        type: Sequelize.STRING(1000)
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      userName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      phoneNumber: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.STRING
      },
      userType: {
        type: Sequelize.STRING
      },
      onboardingStep: {
        type: Sequelize.STRING
      },
      bankName: {
        type: Sequelize.STRING
      },
      accName: {
        type: Sequelize.STRING
      },
      accNumber: {
        type: Sequelize.STRING
      },
      facebookLink: {
        type: Sequelize.STRING
      },
      twitterLink: {
        type: Sequelize.STRING
      },
      instagramLink: {
        type: Sequelize.STRING
      },
      youtubeLink: {
        type: Sequelize.STRING
      },
      verified: {
        type: Sequelize.BOOLEAN
      },
      token: {
        type: Sequelize.STRING
      },
      showComplete: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('Users');
  }
};