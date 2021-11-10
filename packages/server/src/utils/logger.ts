const { join } = require("path");
const winston = require("winston");
const moment = require("moment-timezone");
require("winston-daily-rotate-file");

const format = winston.format.printf(
  ({ level, message }: { level: string; message: string }) => {
    const timestamp = moment().tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:ss");
    return `[${timestamp}][${level.toUpperCase()}]:::${message}`;
  },
);

const transports = [
  new winston.transports.DailyRotateFile({
    filename: join("./", "logs", "api", "%DATE%.log"),
    zippedArchive: false,
    format,
    handleExceptions: true,
  }),
];

transports.push(
  new winston.transports.Console({
    format,
    handleExceptions: true,
    colorize: true,
  }),
);

const logger = winston.createLogger({
  level: 'debug',
  transports,
});

logger.stream = {
  write: (message: string) => logger.info(message),
};

export default logger;
