'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('profesori', {
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
      eth: { type: Sequelize.STRING, allowNull: false },
      eth_full: { type: Sequelize.STRING, allowNull: true },
      p10: { type: Sequelize.INTEGER, allowNull: false },
      p11: { type: Sequelize.INTEGER, allowNull: false },
      p12: { type: Sequelize.INTEGER, allowNull: false },
      p13: { type: Sequelize.INTEGER, allowNull: false },
      p14: { type: Sequelize.INTEGER, allowNull: false },
      p15: { type: Sequelize.INTEGER, allowNull: false },
      p16: { type: Sequelize.INTEGER, allowNull: false },
      p17: { type: Sequelize.INTEGER, allowNull: false },
      p18: { type: Sequelize.INTEGER, allowNull: false },
      p19: { type: Sequelize.INTEGER, allowNull: false },
      p20: { type: Sequelize.INTEGER, allowNull: false },
      p21: {
        type: Sequelize.STRING,
        allowNull: false,
        get() {
          return this.getDataValue('p21').split(';');
        },
        set(val) {
          this.setDataValue('p21', val.join(';'));
        },
      },
      p22: { type: Sequelize.INTEGER, allowNull: false },
      p23: { type: Sequelize.INTEGER, allowNull: false },
      p24: { type: Sequelize.INTEGER, allowNull: false },
      p25: { type: Sequelize.INTEGER, allowNull: false },
      p26: {
        type: Sequelize.STRING,
        allowNull: false,
        get() {
          return this.getDataValue('p26').split(';');
        },
        set(val) {
          this.setDataValue('p26', val.join(';'));
        },
      },
      p26b: { type: Sequelize.STRING, allowNull: true },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      completition_time: { type: Sequelize.INTEGER, allowNull: false },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('profesori');
  }
};
