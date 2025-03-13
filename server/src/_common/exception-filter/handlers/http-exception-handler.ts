import { IExceptionHandler } from '../interfaces';
import { CatchParams } from '../types';
import { HttpException } from '@nestjs/common';

type ValidationResponse = {
  message: string[],
}

const isValidationResponse = (response: string | object): response is ValidationResponse => {
  return (typeof response === 'object') && (response !== null) && ('message' in response)
    && Array.isArray(response.message)
    && response.message.every((msg) => typeof msg === 'string');
};

const isHttpException = (exception: any): exception is HttpException => {
  return (typeof exception === 'object') && (exception !== null) && (typeof exception.getResponse === 'function');
};

const propertiesToSkip = new Set(['response', 'options', 'stack', 'status', 'message', 'name']);

export class HttpExceptionHandler implements IExceptionHandler {
  catch(exception: unknown, params: CatchParams): void {
    const { responseError } = params;
    if (isHttpException(exception)) {
      const response = exception.getResponse();

      for (const prop of Object.getOwnPropertyNames(exception)) {
        if (propertiesToSkip.has(prop)) continue;
        responseError[prop] = exception[prop];
      }

      if (isValidationResponse(response)) {
        responseError.message = 'Bad Request';
        responseError.validation_errors = response.message;
      }
    }
  }
}
