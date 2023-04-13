import fs from "fs";

export function log(data: string) {
  const dateWithTimeStamp = `[${new Date().toLocaleString()}] ${data}`;

  console.log(dateWithTimeStamp);
  fs.appendFile("error.log", `\r\n${dateWithTimeStamp}`, (err) => {
    if (err) throw err;
  });
}
