import { format } from "mysql2";
import db from "src/db";
import { Notice } from "src/types/Notice";

export async function createNotice(notice: Notice) {
  const sql = format("INSERT INTO posts SET ?", notice);

  try {
    const result = await db.query(sql);
    return result;
  } catch (error) {
    console.error("[createNotice]", error);
    throw error;
  }
}
