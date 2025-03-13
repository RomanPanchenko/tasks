import * as config from 'config';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import {
  format,
  transports,
  createLogger as createWinstonLogger,
  addColors,
  LoggerOptions,
  Logger,
} from 'winston';

import { IS_PRODUCTION, IS_TEST } from '../../constants';
import { FileTransportOptions } from './types';
import { SyncWriteFileTransport } from './transports';

const CONSOLE_LOG = config.get('logger.console_log');
const ERROR_LOG_FILE = config.get('logger.error_log_file');
const COMBINED_LOG_FILE = config.get('logger.combined_log_file');
const COLORIZE = config.get('logger.colorize');

addColors({
  info: 'bold gray',
  warn: 'bold yellow',
  error: 'bold cyan',
  debug: 'bold green',
});

const logMessageFormatter = format((info) => {
  let message = `${info.timestamp} ${info.level}:\t`;
  info.level = '';

  if (info.message) {
    message += info.message;
  } else {
    message += 'INCORRECT USAGE OF LOGGER! MESSAGE IS EMPTY!';
  }

  message += '\t';

  if (Array.isArray(info.validation_errors)) {
    message += `Validation Errors: ${info.validation_errors.join(', ')}\n`;
  }

  if (info.stack) {
    let stack = info.stack;
    if (Array.isArray(stack) && stack.length) {
      stack = info.stack[0];
      if (stack && typeof stack === 'object' && (stack as any).stack) {
        stack = (stack as any).stack;
      }
    }

    if (stack && typeof stack === 'string') message += `\n\t${stack}\n`;
  }

  info.message = message;

  return info;
})();

const winstonFormats = format.combine(
  format.label({
    label: '',
  }),
  format.timestamp({
    format: 'YY-MM-DD HH:mm:ss.SSS',
  }),
  logMessageFormatter,
  format.printf(
    (info: any) => {
      return info.message;
    },
  ),
);

const consoleFormat = !IS_PRODUCTION && COLORIZE
  ? format.colorize({ all: true, message: true })
  : null;

const consoleFilter = format((info) => {
  if (IS_PRODUCTION || info.context === 'sql') return false; // Do not print SQL to console (because it is printed by TypeORM Logger)
  return info;
});

const winstonTransports = [];

if (CONSOLE_LOG) {
  const consoleTransport = new transports.Console({
    format: format.combine(consoleFilter(), consoleFormat),
    level: 'debug',
  });

  winstonTransports.push(consoleTransport);
}

if (ERROR_LOG_FILE) {
  const opts: FileTransportOptions = {
    dirname: 'logs',
    filename: 'tasks-errors.%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    level: 'error',
  };

  if (IS_PRODUCTION) {
    const errorLogFileTransport: any = new DailyRotateFile(opts);
    winstonTransports.push(errorLogFileTransport);
  } else {
    const errorLogFileTransport: any = new SyncWriteFileTransport(opts);
    winstonTransports.push(errorLogFileTransport);
  }
}

if (COMBINED_LOG_FILE) {
  const opts: FileTransportOptions = {
    dirname: 'logs',
    filename: 'tasks-combined.%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    level: 'debug',
  };

  if (IS_PRODUCTION) {
    const combinedLogFile: any = new DailyRotateFile(opts);
    winstonTransports.push(combinedLogFile);
  } else {
    const combinedLogFile: any = new SyncWriteFileTransport(opts);
    winstonTransports.push(combinedLogFile);
  }
}

const loggerOptions: any = {
  level: 'debug',
  format: winstonFormats,
  transports: winstonTransports,
};

const fakeLogger = {
  log: () => {},
  info: () => {},
  warn: () => {},
  debug: () => {},
  error: () => {},
} as unknown as Logger;

const createLogger = (options?: LoggerOptions): Logger => {
  return IS_TEST ? fakeLogger : createWinstonLogger(options || loggerOptions);
};

export {
  createLogger,
};
