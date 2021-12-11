import { format } from "mysql2";
import db from "src/db";
import { Notice } from "src/types/Notice";

export async function createNotice({
  site_id,
  title,
  url,
  contents,
  date,
}: Notice) {
  const sql = format("INSERT INTO notice SET ?", {
    site_id,
    title,
    url,
    contents,
    date,
  });

  try {
    const result = await db.query(sql);
    return result;
  } catch (error) {
    console.error("[createNotice]", error);
    throw error;
  }
}
