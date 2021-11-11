import { NextFunction, Request, Response } from "express";
import db from "../../../../../../shared/src/database/models";
import logger from "../../../../utils/logger";
const {restaurant} = db;
export const createRestaurant = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { body } = req;
  body.forEach(async (data:any)=>{
    const tmp = {
      restaurant_name: data.restaurant_name,
      food_name: data.food_name,
      date: new Date(data.date),
      day: data.day,
      time: data.time
    };
    await restaurant.create(tmp).catch(()=>console.log(tmp));
  });
  res.json(body);
};
