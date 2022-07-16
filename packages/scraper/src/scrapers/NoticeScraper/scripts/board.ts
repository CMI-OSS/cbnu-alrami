import { format } from "mysql2";
import db from "src/db";


interface Board { 
    id:number,
    name:string,
    url:string
}

export async function createBoard({id,name,url}:Board){
    const sql = format(`INSERT INTO board SET ? ON DUPLICATE KEY UPDATE ?;`, [
        {
          id,name,url
        },
        { id },
      ]);

    await db.query(sql);

}