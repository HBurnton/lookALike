const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Post extends Model {}

Post.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.STRING,
    },
    numberAgree: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    numberDisagree: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    imageOneUrl: {
      type: DataTypes.TEXT,
      defaultValue: "",
      allowNull: false,
    },
    imageTwoUrl: {
      type: DataTypes.TEXT,
      defaultValue: "",
      allowNull: false,
    },
  },
  {
    sequelize,
  }
);

module.exports = Post;
