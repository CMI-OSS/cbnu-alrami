import { NextFunction, Request, Response } from "express";
import restaurant from "../../../../../../shared/src/database/models";

export const createRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { body } = req;
  const record: any = await restaurant.create(body);
  res.json(record);
};
