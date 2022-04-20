import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { FindManyOptions } from "typeorm";
// import { Request } from "express";

// enum OrderDirection {
//   DESC = "DESC",
//   ASC = "ASC",
// }

// type Keys = {
//   [key: string]: OrderDirection;
// };

// function generateOrder(columns: string[]): Keys {
//   const orderDirections = {};
//   columns.forEach((column) => {
//     if (column[0] === "-") orderDirections[column.substring(1)] = "DESC";
//     else orderDirections[column] = "ASC";
//   });
//   return orderDirections;
// }

export const PageQuery = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): FindManyOptions<unknown> => {
    const { query } = ctx.switchToHttp().getRequest();
    const { limit, page, ...options } = query;
    const result = { take: limit, skip: limit * (page - 1), where: options };
    if (!limit || !page) {
      result.take = 10;
      result.skip = 0;
    }
    return result;
  },
);
