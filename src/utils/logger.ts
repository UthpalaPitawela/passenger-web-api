// src/utils/logger.ts
import winston from 'winston';

const { combine, timestamp, printf, colorize } = winston.format;

// Custom log format
const logFormat = printf(({ level, message, timestamp, layer, functionName, ...meta }) => {
  return `${timestamp} [${layer}] [${functionName}] ${level}: ${message} ${Object.keys(meta).length ? JSON.stringify(meta) : ''}`;
});

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    timestamp(),
    logFormat
  ),
  transports: [
    new winston.transports.Console({
      format: combine(
        colorize(),
        timestamp(),
        logFormat
      )
    }),
  ],
});

// Helper wrapper to add layer/functionName
export const logHelper = (layer: string, functionName: string) => ({
  info: (msg: string, meta = {}) => logger.info(msg, { layer, functionName, ...meta }),
  error: (msg: string, meta = {}) => logger.error(msg, { layer, functionName, ...meta }),
  warn: (msg: string, meta = {}) => logger.warn(msg, { layer, functionName, ...meta }),
  debug: (msg: string, meta = {}) => logger.debug(msg, { layer, functionName, ...meta }),
});
