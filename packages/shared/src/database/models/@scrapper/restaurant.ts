import { Model, Sequelize, DataTypes, Optional } from "sequelize";

interface RestaurantAttributes {
  restaurant_name: string;
  food_name: string;
  date: Date;
  day: string;
  time: string;
}

interface RestaurantCreationAttributes
  extends Optional<RestaurantAttributes, "restaurant_name"> {}

export interface RestaurantInstance
  extends Model<RestaurantAttributes, RestaurantCreationAttributes>,
    RestaurantAttributes {} //타임스탬프 등 추가
const model = (sequelize: Sequelize, DataTypes: any) => {
  const Restaurant = sequelize.define<RestaurantInstance>(
    "restaurant",
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
      modelName: "Restaurant",
      freezeTableName: true,
      timestamps: false,
    },
  );
  return Restaurant;
};

module.exports = model;
