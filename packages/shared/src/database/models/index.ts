"use strict";

import { readdirSync } from "fs";
import { join, basename } from "path";
import { Sequelize, DataTypes } from "sequelize";
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
);

const db: {
  [key: string]: any;
} = {};

readdirSync(__dirname)
  .filter((dir: string) => dir.startsWith("@"))
  .forEach((dir: string) => {
    const path: string = join(__dirname, dir);

    readdirSync(path)
      .filter((file: string) => {
        return file.indexOf(".") !== 0 && file.slice(-3) === ".ts";
      })
      .forEach((file: string) => {
        const model = require(join(path, file))(sequelize, DataTypes);
        db[model.name] = model;
      });
  });
db.sequelize = sequelize;
db.Sequelize = Sequelize;
export default db;
