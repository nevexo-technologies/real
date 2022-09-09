'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameTable('Ambassadors', 'ambasadori');
    await queryInterface.renameTable('EleviForm', 'elevi');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameTable('ambasadori', 'Ambassadors');
    await queryInterface.renameTable('elevi', 'EleviForm');
  }
};
