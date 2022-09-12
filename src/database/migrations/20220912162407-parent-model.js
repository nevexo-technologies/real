'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('parinti', {
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
      t10: { type: Sequelize.INTEGER, allowNull: false },
      t11: { type: Sequelize.INTEGER, allowNull: false },
      t12: { type: Sequelize.INTEGER, allowNull: false },
      t13: { type: Sequelize.INTEGER, allowNull: false },
      t13b: { type: Sequelize.INTEGER, allowNull: true },
      t14: { type: Sequelize.INTEGER, allowNull: false },
      t15: { type: Sequelize.INTEGER, allowNull: false },
      t16: { type: Sequelize.INTEGER, allowNull: false },
      t17: { type: Sequelize.INTEGER, allowNull: false },
      t18: { type: Sequelize.INTEGER, allowNull: false },
      t19: { type: Sequelize.INTEGER, allowNull: false },
      t19b: { type: Sequelize.STRING, allowNull: true },
      t20: {
        type: Sequelize.STRING,
        allowNull: false,
        get() {
          return this.getDataValue('t20').split(';');
        },
        set(val) {
          this.setDataValue('t20', val.join(';'));
        },
      },
      t20b: { type: Sequelize.STRING, allowNull: true },
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
    await queryInterface.dropTable('parinti');
  }
};
