import { createLogger, format, transports } from 'winston';
const { combine, timestamp, label, printf } = format;
import path from 'path';
import DailyRotateFile from 'winston-daily-rotate-file';
const successLogFile = path.join(
  process.cwd(),
  'logs',
  'winston',
  'successes',
  'success-%DATE%.log'
);
const errorsLogFile = path.join(
  process.cwd(),
  'logs',
  'winston',
  'errors',
  'error-%DATE%.log'
);

const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return `${date} ${hours}:${minutes}:${seconds} [${label}] ${level}: ${message}`;
});

export const infoLogger = createLogger({
  level: 'info',
  format: combine(label({ label: 'um-info' }), timestamp(), myFormat),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: successLogFile,
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});

export const errorLogger = createLogger({
  level: 'error',
  format: combine(label({ label: 'um-error' }), timestamp(), myFormat),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: errorsLogFile,
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});
