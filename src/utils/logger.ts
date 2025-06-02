import winston from "winston";

const logLevel = process.env.LOG_LEVEL || "info";
const nodeEnv = process.env.NODE_ENV || "development";

// Custom log format
const logFormat = winston.format.combine(
  winston.format.timestamp({
    format: "YYYY-MM-DD HH:mm:ss",
  }),
  winston.format.errors({ stack: true }),
  winston.format.json(),
  winston.format.printf(({ timestamp, level, message, ...meta }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message} ${
      Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ""
    }`;
  })
);

// Console format for development
const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({
    format: "HH:mm:ss",
  }),
  winston.format.printf(({ timestamp, level, message, ...meta }) => {
    return `${timestamp} ${level}: ${message} ${
      Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ""
    }`;
  })
);

// Create logger instance
export const logger = winston.createLogger({
  level: logLevel,
  format: logFormat,
  defaultMeta: { service: "email-service" },
  transports: [
    // Write all logs to console
    new winston.transports.Console({
      format: nodeEnv === "development" ? consoleFormat : logFormat,
    }),

    // Write error logs to error.log file
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),

    // Write all logs to combined.log file
    new winston.transports.File({
      filename: "logs/combined.log",
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
  ],
});

// Handle uncaught exceptions and unhandled rejections
logger.exceptions.handle(
  new winston.transports.File({ filename: "logs/exceptions.log" })
);

logger.rejections.handle(
  new winston.transports.File({ filename: "logs/rejections.log" })
);

// Create logs directory if it doesn't exist
import fs from "fs";
if (!fs.existsSync("logs")) {
  fs.mkdirSync("logs");
}
