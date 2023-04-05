import fs from "fs";

export function log(data: string) {
  fs.appendFile("error.log", `\r\n${data}`, (err) => {
    if (err) throw err;
  });
}
