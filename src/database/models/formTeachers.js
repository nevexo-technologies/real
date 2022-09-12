import { Model, DataTypes } from 'sequelize';
import connection from '../connection';

const initTeachers = (sequelize, DataTypes) => {
  class Teachers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Teachers.init({
    ref: { type: DataTypes.STRING, allowNull: true },
    email: { type: DataTypes.STRING, allowNull: false },
    age: { type: DataTypes.INTEGER, allowNull: false },
    location: { type: DataTypes.STRING, allowNull: false },
    hs: { type: DataTypes.STRING, allowNull: false },
    eth: { type: DataTypes.STRING, allowNull: false },
    eth_full: { type: DataTypes.STRING, allowNull: true },
    p10: { type: DataTypes.INTEGER, allowNull: false },
    p11: { type: DataTypes.INTEGER, allowNull: false },
    p12: { type: DataTypes.INTEGER, allowNull: false },
    p13: { type: DataTypes.INTEGER, allowNull: false },
    p14: { type: DataTypes.INTEGER, allowNull: false },
    p15: { type: DataTypes.INTEGER, allowNull: false },
    p16: { type: DataTypes.INTEGER, allowNull: false },
    p17: { type: DataTypes.INTEGER, allowNull: false },
    p18: { type: DataTypes.INTEGER, allowNull: false },
    p19: { type: DataTypes.INTEGER, allowNull: false },
    p20: { type: DataTypes.INTEGER, allowNull: false },
    p21: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return this.getDataValue('p21').split(';');
      },
      set(val) {
        this.setDataValue('p21', val.join(';'));
      },
    },
    p22: { type: DataTypes.INTEGER, allowNull: false },
    p23: { type: DataTypes.INTEGER, allowNull: false },
    p24: { type: DataTypes.INTEGER, allowNull: false },
    p25: { type: DataTypes.INTEGER, allowNull: false },
    p26: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return this.getDataValue('p26').split(';');
      },
      set(val) {
        this.setDataValue('p26', val.join(';'));
      },
    },
    p26b: { type: DataTypes.STRING, allowNull: true },
    completition_time: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    sequelize,
    modelName: 'Teachers',
    tableName: 'profesori',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });
  return Teachers;
};

export default initTeachers(connection, DataTypes);