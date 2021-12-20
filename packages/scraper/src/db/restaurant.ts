import { format } from "mysql2";
import db from "src/db";
import { Menu } from "src/types/Menu";

export async function createMenu(menu: Menu) {
  const sql = format(
    `INSERT INTO restaurant SET ? ON DUPLICATE KEY UPDATE date='${menu.date}', time=${menu.time};`,
    menu,
  );

  try {
    const result = await db.query(sql);
    return result;
  } catch (error) {
    console.error("[createRestaurant]", error);
    throw error;
  }
}
