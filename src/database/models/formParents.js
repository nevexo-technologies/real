import { Model, DataTypes } from 'sequelize';
import connection from '../connection';

const initParinti = (sequelize, DataTypes) => {
  class Parinti extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Parinti.init({
    ref: { type: DataTypes.STRING, allowNull: true },
    email: { type: DataTypes.STRING, allowNull: false },
    age: { type: DataTypes.INTEGER, allowNull: false },
    location: { type: DataTypes.STRING, allowNull: false },
    hs: { type: DataTypes.STRING, allowNull: false },
    class: { type: DataTypes.INTEGER, allowNull: false },
    letter: { type: DataTypes.STRING, allowNull: false },
    eth: { type: DataTypes.STRING, allowNull: false },
    eth_full: { type: DataTypes.STRING, allowNull: true },
    t10: { type: DataTypes.INTEGER, allowNull: false },
    t11: { type: DataTypes.INTEGER, allowNull: false },
    t12: { type: DataTypes.INTEGER, allowNull: false },
    t13: { type: DataTypes.INTEGER, allowNull: false },
    t13b: { type: DataTypes.INTEGER, allowNull: true },
    t14: { type: DataTypes.INTEGER, allowNull: false },
    t15: { type: DataTypes.INTEGER, allowNull: false },
    t16: { type: DataTypes.INTEGER, allowNull: false },
    t17: { type: DataTypes.INTEGER, allowNull: false },
    t18: { type: DataTypes.INTEGER, allowNull: false },
    t19: { type: DataTypes.INTEGER, allowNull: false },
    t19b: { type: DataTypes.STRING, allowNull: true },
    t20: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return this.getDataValue('t20').split(';');
      },
      set(val) {
        this.setDataValue('t20', val.join(';'));
      },
    },
    t20b: { type: DataTypes.STRING, allowNull: true },
    completition_time: { type: DataTypes.INTEGER, allowNull: false}
  }, {
    sequelize,
    modelName: 'Parinti',
    tableName: 'parinti',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return Parinti;
};

export default initParinti(connection, DataTypes);