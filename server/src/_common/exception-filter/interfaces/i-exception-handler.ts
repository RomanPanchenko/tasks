import { CatchParams } from '../types';

export interface IExceptionHandler {
  catch(exception: unknown, params: CatchParams): void;
}
