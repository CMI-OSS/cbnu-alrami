import { Router } from "express";
import { sampleController } from "../controllers/global.js";

const globalRouter = Router();

globalRouter.get("/", sampleController);

// TODO: 글로벌 라우터 경로 및 컨트롤러 추가.

export default globalRouter;
