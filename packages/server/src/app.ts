import express from "express";
import cors from "cors";
const morgan =require("morgan"); 
import logger from "./utils/logger";
import apiRouter from "./routes/api";
const app = express();

app.use(morgan('dev', { stream:logger.stream }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", apiRouter);
app.use((req, res) => {
  res.status(404).json({
    success: false,
    status: 404,
    code: "NOT_FOUND",
    message: "유효하지 않은 요청입니다.",
  });
});
export = app;
