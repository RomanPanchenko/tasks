import { IExceptionHandler } from '../interfaces';
import { CatchParams } from '../types';

export class UnknownExceptionHandler implements IExceptionHandler {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  catch(exception: unknown, params: CatchParams): void {}
}
