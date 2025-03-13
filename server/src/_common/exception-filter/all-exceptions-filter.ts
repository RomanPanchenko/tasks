import { Request, Response } from 'express';
import { HttpAdapterHost } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ExceptionFilter, Catch, ArgumentsHost, Logger, HttpException, HttpStatus } from '@nestjs/common';

import { HttpExceptionHandler, UnknownExceptionHandler } from './handlers';
import { IExceptionHandler } from './interfaces';
import { getRequestDetails } from './handlers/lib';
import { IErrorResponse } from '../types/interfaces';
import { IException } from './types';

interface IExceptionHandlerDescriptor {
  name?: string;
  exceptionClass: new (...args: any[]) => Error;
  exceptionHandler: IExceptionHandler;
}

const exceptionHandlers: IExceptionHandlerDescriptor[] = [
  { exceptionClass: HttpException, exceptionHandler: new HttpExceptionHandler() },
  { exceptionClass: Error, exceptionHandler: new UnknownExceptionHandler() },
];

const getExceptionHandler = (exception: IException): IExceptionHandler => {
  // First try to find exception handler by name
  for (const handler of exceptionHandlers.filter((h) => h.name !== undefined)) {
    if (exception.name === handler.name) {
      return handler.exceptionHandler;
    }
  }
  // Then try to find by instance type
  for (const handler of exceptionHandlers) {
    if (exception instanceof handler.exceptionClass) {
      return handler.exceptionHandler;
    }
  }
  // Fallback: return the last handler (unknown exception)
  return exceptionHandlers.at(-1).exceptionHandler;
};

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: IException, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    let request: Request;
    let response: Response;
    let path = '';

    if (host.getType() === 'http') {
      // HTTP context
      const ctx = host.switchToHttp();
      request = ctx.getRequest<Request>();
      response = ctx.getResponse<Response>();
      path = httpAdapter.getRequestUrl(request);
    } else {
      // For non-HTTP contexts (likely GraphQL), extract context via GqlExecutionContext
      const gqlCtx = GqlExecutionContext.create(host as any);
      const gqlContext = gqlCtx.getContext();
      request = gqlContext.req || ({} as Request);
      response = gqlContext.res || ({} as Response);
      path = request.originalUrl || '/graphql';
    }

    const exceptionHandler = getExceptionHandler(exception);

    const responseError: IErrorResponse = {
      statusCode:
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR,
      message: exception.message,
    };

    // Allow the handler to modify the responseError if needed.
    exceptionHandler.catch(exception, { host, httpAdapter, responseError });

    const logError: IErrorResponse = {
      ...responseError,
      name: exception.name,
      stack: exception.stack,
      request: getRequestDetails(request),
      cause: exception.cause ? exception.cause : null,
      timestamp: new Date().toISOString(),
      path,
    };

    if (!logError.message && exception.code === 'ECONNREFUSED') {
      logError.message = 'Lost connection to the database';
    }

    if (!responseError.message && exception.code === 'ECONNREFUSED') {
      responseError.message = 'Lost connection to the database';
    }

    Logger.error(logError);

    // Use httpAdapter.reply only for HTTP context. For GraphQL, throw an HttpException.
    if (host.getType() === 'http') {
      httpAdapter.reply(response, responseError, responseError.statusCode);
    } else {
      throw new HttpException(responseError, responseError.statusCode);
    }
  }
}
