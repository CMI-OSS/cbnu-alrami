import { NextFunction, Request, Response } from "express";
const { Restaurant } = require("../../../../../../shared/src/database/models");

export const createRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { body } = req;
  body.forEach()
  const record: any = await Restaurant.create(body);
  res.json(record);
};
