'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Novels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Novels.init({
    title: DataTypes.STRING,
    slug: DataTypes.STRING,
    author: DataTypes.STRING,
    description: DataTypes.TEXT,
    img: DataTypes.STRING,
    rating: DataTypes.DECIMAL,
    popularity: DataTypes.INTEGER,
    info: DataTypes.JSON
  }, {
    sequelize,
    tableName: 'Novels',
    modelName: 'Novels',
  });
  return Novels;
};