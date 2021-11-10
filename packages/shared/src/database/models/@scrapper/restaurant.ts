import { Model } from "sequelize";

const model = (sequelize, DataTypes) => {
  class restaurant extends Model {
    static associate(models) {}
  }
  restaurant.init(
    {
      restaurant_name: {
        primaryKey: true,
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      food_name: {
        type: DataTypes.STRING(1000),
      },
      date: {
        primaryKey: true,
        type: DataTypes.DATE,
        allowNull: false,
      },
      day: {
        type: DataTypes.STRING(50),
      },
      time: {
        primaryKey: true,
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "restaurant",
      freezeTableName: true,
      timestamps: false,
    },
  );
  return restaurant;
};


export default model;