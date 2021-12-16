import { format, RowDataPacket } from "mysql2";
import db from "src/db";
import { Notice } from "src/types/Notice";

export async function createNotice({
  site_id,
  title,
  url,
  contents,
  date,
}: Notice) {
  const sql = format(`INSERT INTO notice SET ? ON DUPLICATE KEY UPDATE ?;`, [
    {
      site_id,
      title,
      url,
      contents,
      date,
    },
    { title, contents, date },
  ]);

  try {
    const result = await db.query(sql);
    return result;
  } catch (error) {
    console.error("[createNotice]", error);
    throw error;
  }
}

export async function hasNotice({ site_id, title, url }: Notice) {
  const sql = format(
    `SELECT title FROM notice WHERE site_id=? and title=? and url=? `,
    [ site_id, title, url ],
  );

  try {
    const [ result ] = await db.query<RowDataPacket[]>(sql);

    return false;
  } catch (error) {
    console.error("[hasNotice]", error);
    throw error;
  }
}

