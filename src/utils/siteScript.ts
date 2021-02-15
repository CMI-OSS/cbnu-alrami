const fs = require("fs");
const path = require("path");

const SCRIPT_PATH = `./src/script`;

export function getSiteScriptList() {
  const collegeList = fs.readdirSync(SCRIPT_PATH);

  // 대학 경로 목록
  const collegePathList = collegeList
    .filter((college: any) => college != "index.js")
    .map((college: any) => path.join(SCRIPT_PATH, college));

  // 사이트 경로 목록
  const sitePathList = collegePathList
    .map((collegePath: any) =>
      fs
        .readdirSync(collegePath)
        .map((site: any) => path.join(collegePath, site))
    )
    .flat();

  // 사이트 스크립트 목록
  const siteList = sitePathList.map((sitePath: any) =>
    require(sitePath.replace("src", ".."))
  );

  return siteList;
}
