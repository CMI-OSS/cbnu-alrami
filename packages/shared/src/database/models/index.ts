"use strict";

import { readdirSync } from "fs";
import { join, basename } from "path";
import { Sequelize, DataTypes } from "sequelize";
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db: {
  [key: string]: any;
} = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
);

readdirSync(__dirname)
  .filter((dir:string) => dir.startsWith("@"))
  .forEach((dir:string) => {
    const path: string = join(__dirname, dir);
    readdirSync(path)
      .filter((file:string) => {
        return (
          file.indexOf(".") !== 0 &&
          file !== basename(__filename) &&
          file.slice(-3) === ".js"
        );
      })
      .forEach((file:string) => {
        const model = require(join(__dirname, file))(sequelize, DataTypes);
        db[model.name] = model;
      });
  });

Object.keys(db).forEach((modelName:string) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
