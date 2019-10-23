export interface IResponse {
  statusCode: number;
  header: object;
  data: string | object | ArrayBuffer;
  errMsg?: string;
}

export interface IData<T = any> {
  status: 'success' | 'error';
  data: T;
  err_msg?: string;
}