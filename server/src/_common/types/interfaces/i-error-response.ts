export interface IErrorResponse {
  statusCode: number;
  message: string;
  validation_errors?: string[];
  name?: string;
  stack?: string;
  request?: string;
  cause?: object;
  timestamp?: string;
  path?: string;
}
