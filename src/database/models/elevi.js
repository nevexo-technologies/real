import { Model, DataTypes } from 'sequelize';
import connection from '../connection';

const initUser = (sequelize, DataTypes) => {
  class Elevi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Elevi.init({
    ref: { type: DataTypes.STRING, allowNull: true },
    email: { type: DataTypes.STRING, allowNull: false },
    age: { type: DataTypes.INTEGER, allowNull: false },
    location: { type: DataTypes.STRING, allowNull: false },
    hs: { type: DataTypes.STRING, allowNull: false },
    class: { type: DataTypes.INTEGER, allowNull: false },
    letter: { type: DataTypes.STRING, allowNull: false },
    eth: { type: DataTypes.STRING, allowNull: false },
    eth_full: { type: DataTypes.STRING, allowNull: true },
    e10: { type: DataTypes.INTEGER, allowNull: false },
    e11: { type: DataTypes.INTEGER, allowNull: false },
    e12: { type: DataTypes.INTEGER, allowNull: false },
    e13: { type: DataTypes.INTEGER, allowNull: false },
    e14: { type: DataTypes.INTEGER, allowNull: false },
    e15: { type: DataTypes.INTEGER, allowNull: false },
    e16: { type: DataTypes.INTEGER, allowNull: false },
    e17: { type: DataTypes.STRING, allowNull: true },
    e18: { type: DataTypes.INTEGER, allowNull: false },
    e19: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return this.getDataValue('e19').split(';');
      },
      set(val) {
        this.setDataValue('e19', val.join(';'));
      },
    },
    e20: { type: DataTypes.INTEGER, allowNull: false },
    e21: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return this.getDataValue('e21').split(';');
      },
      set(val) {
        this.setDataValue('e21', val.join(';'));
      },
    },
    e22: { type: DataTypes.INTEGER, allowNull: false },
    e23: { type: DataTypes.INTEGER, allowNull: false },
    e24: { type: DataTypes.INTEGER, allowNull: false },
    e24b: { type: DataTypes.INTEGER, allowNull: true },
    e25: { type: DataTypes.INTEGER, allowNull: false },
    e25b: { type: DataTypes.INTEGER, allowNull: true },
    e26: { type: DataTypes.INTEGER, allowNull: false },
    e27: { type: DataTypes.INTEGER, allowNull: false },
    e28: { type: DataTypes.INTEGER, allowNull: false },
    e29: { type: DataTypes.INTEGER, allowNull: false },
    e30: { type: DataTypes.INTEGER, allowNull: false },
    e31: { type: DataTypes.INTEGER, allowNull: false },
    e32: { type: DataTypes.INTEGER, allowNull: false },
    e33: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return this.getDataValue('e33').split(';');
      },
      set(val) {
        this.setDataValue('e33', val.join(';'));
      },
    },
    e34: { type: DataTypes.INTEGER, allowNull: false },
    e35: { type: DataTypes.INTEGER, allowNull: false },
    e36: { type: DataTypes.INTEGER, allowNull: false },
    e37: { type: DataTypes.INTEGER, allowNull: false },
    e38: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return this.getDataValue('e38').split(';');
      },
      set(val) {
        this.setDataValue('e38', val.join(';'));
      },
    },
    e38b: { type: DataTypes.STRING, allowNull: true },
    e39: { type: DataTypes.INTEGER, allowNull: false },
    e39b: { type: DataTypes.STRING, allowNull: true },
    e40: { type: DataTypes.INTEGER, allowNull: false },
    e41: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return this.getDataValue('e41').split(';');
      },
      set(val) {
        this.setDataValue('e41', val.join(';'));
      },
    },
    e41b: { type: DataTypes.STRING, allowNull: true },
    e43: { type: DataTypes.INTEGER, allowNull: false },
    completition_time: { type: DataTypes.INTEGER, allowNull: false}
  }, {
    sequelize,
    modelName: 'Elevi',
    tableName: 'elevi',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return Elevi;
};

export default initUser(connection, DataTypes);