import * as fs from 'fs';
import * as path from 'path';
import * as Transport from 'winston-transport';
import * as moment from 'moment';
import { FileTransportOptions } from '../types';

export class SyncWriteFileTransport extends Transport {
  private logFilePath: string;
  private oldDate: string;
  private datePattern: string;

  constructor(opts: FileTransportOptions) {
    super(opts);
    this.oldDate = moment().format(opts.datePattern);
    this.datePattern = opts.datePattern;
    const filename = opts.filename.replace('%DATE%', this.oldDate);
    this.logFilePath = path.join(process.cwd(), opts.dirname, filename);
  }

  log(info, callback) {
    const newDate = moment().format(this.datePattern);
    if (this.oldDate !== newDate) {
      this.logFilePath = this.logFilePath.replace(this.oldDate, newDate);
      this.oldDate = newDate;
    }

    setImmediate(() => {
      this.emit('logged', info);
    });

    // Synchronously write to the log file
    fs.writeFileSync(this.logFilePath, `${this.level}: ${info.message}\n`, { flag: 'a' });

    callback();
  }
}

