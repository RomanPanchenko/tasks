import { AbstractHttpAdapter } from '@nestjs/core';
import { ArgumentsHost } from '@nestjs/common';
import { IErrorResponse } from '../../types/interfaces';

export type CatchParams = {
  host: ArgumentsHost;
  responseError: IErrorResponse;
  httpAdapter: AbstractHttpAdapter;
};
