import fs from "fs";

import dayjs from "dayjs";

export function log(data: string) {
  const now = dayjs();
  const dateWithTimeStamp = `[${new Date().toLocaleString()}] ${data}`.slice(
    0,
    1000,
  );

  console.log(dateWithTimeStamp);
  fs.appendFile(
    `${now.format("YYYY-MM-DD")} error.log`,
    `\r\n${dateWithTimeStamp}`,
    (err) => {
      if (err) throw err;
    },
  );
}
