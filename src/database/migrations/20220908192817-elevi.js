'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('EleviForm', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ref: { type: Sequelize.STRING, allowNull: true },
      email: { type: Sequelize.STRING, allowNull: false },
      age: { type: Sequelize.INTEGER, allowNull: false },
      location: { type: Sequelize.STRING, allowNull: false },
      hs: { type: Sequelize.STRING, allowNull: false },
      class: { type: Sequelize.INTEGER, allowNull: false },
      letter: { type: Sequelize.STRING, allowNull: false },
      eth: { type: Sequelize.STRING, allowNull: false },
      eth_full: { type: Sequelize.STRING, allowNull: true },
      e10: { type: Sequelize.INTEGER, allowNull: false },
      e11: { type: Sequelize.INTEGER, allowNull: false },
      e12: { type: Sequelize.INTEGER, allowNull: false },
      e13: { type: Sequelize.INTEGER, allowNull: false },
      e14: { type: Sequelize.INTEGER, allowNull: false },
      e15: { type: Sequelize.INTEGER, allowNull: false },
      e16: { type: Sequelize.INTEGER, allowNull: false },
      e17: { type: Sequelize.STRING, allowNull: true },
      e18: { type: Sequelize.INTEGER, allowNull: false },
      e19: {
        type: Sequelize.STRING,
        allowNull: false,
        get() {
          return this.getDataValue('e19').split(';');
        },
        set(val) {
          this.setDataValue('e19', val.join(';'));
        },
      },
      e20: { type: Sequelize.INTEGER, allowNull: false },
      e21: {
        type: Sequelize.STRING,
        allowNull: false,
        get() {
          return this.getDataValue('e21').split(';');
        },
        set(val) {
          this.setDataValue('e21', val.join(';'));
        },
      },
      e22: { type: Sequelize.INTEGER, allowNull: false },
      e23: { type: Sequelize.INTEGER, allowNull: false },
      e24: { type: Sequelize.INTEGER, allowNull: false },
      e24b: { type: Sequelize.INTEGER, allowNull: true },
      e25: { type: Sequelize.INTEGER, allowNull: false },
      e25b: { type: Sequelize.INTEGER, allowNull: true },
      e26: { type: Sequelize.INTEGER, allowNull: false },
      e27: { type: Sequelize.INTEGER, allowNull: false },
      e28: { type: Sequelize.INTEGER, allowNull: false },
      e29: { type: Sequelize.INTEGER, allowNull: false },
      e30: { type: Sequelize.INTEGER, allowNull: false },
      e31: { type: Sequelize.INTEGER, allowNull: false },
      e32: { type: Sequelize.INTEGER, allowNull: false },
      e33: {
        type: Sequelize.STRING,
        allowNull: false,
        get() {
          return this.getDataValue('e33').split(';');
        },
        set(val) {
          this.setDataValue('e33', val.join(';'));
        },
      },
      e34: { type: Sequelize.INTEGER, allowNull: false },
      e35: { type: Sequelize.INTEGER, allowNull: false },
      e36: { type: Sequelize.INTEGER, allowNull: false },
      e37: { type: Sequelize.INTEGER, allowNull: false },
      e38: {
        type: Sequelize.STRING,
        allowNull: false,
        get() {
          return this.getDataValue('e33').split(';');
        },
        set(val) {
          this.setDataValue('e33', val.join(';'));
        },
      },
      e38b: { type: Sequelize.STRING, allowNull: true },
      e39: { type: Sequelize.INTEGER, allowNull: false },
      e39b: { type: Sequelize.STRING, allowNull: true },
      e40: { type: Sequelize.INTEGER, allowNull: false },
      e41: {
        type: Sequelize.STRING,
        allowNull: false,
        get() {
          return this.getDataValue('e41').split(';');
        },
        set(val) {
          this.setDataValue('e41', val.join(';'));
        },
      },
      e41b: { type: Sequelize.STRING, allowNull: true },
      e43: { type: Sequelize.INTEGER, allowNull: false },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      completition_time: { type: Sequelize.INTEGER, allowNull: false},
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('EleviForm');
  }
};
