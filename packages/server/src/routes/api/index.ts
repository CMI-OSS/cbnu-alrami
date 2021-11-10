import Router from "express";
import { readdirSync, statSync } from "fs";
import { join } from "path";
import logger from "../../utils/logger";
const router = Router();

const version = ["v1"]; //api 활성화할 버전 셀렉트[여러개 가능]

readdirSync(__dirname)
  .filter(
    (dir) =>
      statSync(join(__dirname, dir)).isDirectory() && version.includes(dir),
  )
  .forEach((dir) => {
    
    const r = Router();
    const path = join(__dirname, dir); //버전 폴더 경로 api/v1
    readdirSync(path) //버전폴더 하위 폴더들
      .filter((dir) => statSync(join(path, dir)).isDirectory())
      .forEach((dir) => {
        r.use(`/${dir}`, require(join(path, dir)));
        logger.debug(`${dir} API Loaded!`);
      }); //r라우터에 일괄 추가
    router.use(`/${dir}`, r); //버전별 라우터에 r라우터 추가
  });

export default router;
