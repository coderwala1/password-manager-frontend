export interface IResponse<T = undefined> {
  message: string;
  error: number;
  data: T;
}

export interface IErrorResponse {
  errorCode: string;
  message: string;
}
