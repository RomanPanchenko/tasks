export interface IException {
  name?: string | undefined;
  message: string;
  stack: string;
  cause?: object;
  code?: string;
}
