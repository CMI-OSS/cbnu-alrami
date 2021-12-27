import { format } from "mysql2";
import db from "src/db";
import { Calendar } from "src/types/Calendar";

export async function createSchedule(schedule: Calendar) {
  const sql = format(`INSERT IGNORE INTO schedule SET ? `, [ schedule ]);

  try {
    const result = await db.query(sql);
    return result;
  } catch (error) {
    console.error("[createSchedule]", error);
    throw error;
  }
}
