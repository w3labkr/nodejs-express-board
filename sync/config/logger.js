/**
 * Logger
 *
 * @usage
 * const morgan = require('morgan');
 * const logger = require('./config/logger');
 *
 * @package W3LabKr
 * @subpackage Expressjs_Init
 * @since Expressjs Init 1.1.0
 */
const appRoot = require('app-root-path');
const fs = require('fs');
const winston = require('winston');
require('winston-daily-rotate-file');

// Defined Constants
const logRoot = `${appRoot}/logs`;

// make sure directory
if (!fs.existsSync(logRoot)) {
  fs.mkdirSync(logRoot);
}

const consoleLog = {
  name: 'consoleLog',
  colorize: false,
  timestamp: () => {
    new Date().toFormat('YYYY-MM-DD HH24:MI:SS');
  },
  json: false,
};

const errorLog = {
  name: 'errorLog',
  level: 'error',
  filename: `${logRoot}/error.log`,
  maxsize: 1000000, // 1m
  maxFiles: 14,
  timestamp: () => {
    new Date().toFormat('YYYY-MM-DD HH24:MI:SS');
  },
  json: false,
};

const dailyLog = {
  name: 'daily',
  level: 'info',
  filename: `${logRoot}/daily-%DATE%.log`,
  datePatten: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
  timestamp: () => {
    new Date().toFormat('YYYY-MM-DD HH24:MI:SS');
  },
  json: false,
};

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(consoleLog),
    new winston.transports.File(errorLog),
    new winston.transports.DailyRotateFile(dailyLog),
  ],
});

logger.stream = {
  write: (message, encoding) => {
    logger.info(message);
  },
};

module.exports = logger;
