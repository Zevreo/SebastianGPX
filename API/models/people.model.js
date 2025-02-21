const { DataTypes } = require("sequelize");
const sequelize = require("../db/instance");

const People = sequelize.define("People", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV1,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fatherLastName: {
    type: DataTypes.STRING,
  },
  motherLastName: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.TEXT,
  },
  phone: {
    type: DataTypes.STRING(13),
  },
});

People.sync();

module.exports = People;
