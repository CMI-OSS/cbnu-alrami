import { createParamDecorator, ExecutionContext } from "@nestjs/common";
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
  (data: unknown, ctx: ExecutionContext): any => {
    return data;
  },
);
