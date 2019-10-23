import Taro from '@tarojs/taro';

interface IResponse {
  statusCode: number;
  header: object;
  data: string | object | ArrayBuffer;
  errMsg?: string;
}

interface IData {
  status: 'success' | 'error';
  data?: any;
  err_msg?: string;
}

/**
 * 网络请求状态检验
 * @param response
 */
function checkStatusCode(response: IResponse): IResponse {
  if (response.statusCode >= 200 && response.statusCode < 300) {
    return response;
  }
  const error = new Error(String(response.statusCode));
  if (response.errMsg !== undefined) {
    error.message = response.errMsg;
  }
  throw error;
}

/**
 * 服务器返回数据检验
 * @param response
 */
function chaeckStatus(response: IResponse): IData {
  const data: IData = response.data as IData;
  if (data.status === 'success') {
    return data;
  }
  const error = new Error('error');
  if (data.err_msg !== undefined) {
    error.message = data.err_msg;
  }
  throw error;
}

/**
 * 请求基本封装
 * @param url
 * @param method
 * @param data
 * @param header
 */
async function request(
  url: string,
  method: 'GET' | 'POST',
  data: object = {},
  header: object = {}
): Promise<IData> {
  try {
    const token = Taro.getStorageSync('token');
    const response: IResponse = await Taro.request({
      url: url,
      header: token ? { ...header, authorization: token } : { ...header },
      method: method,
      data: data
    });
    checkStatusCode(response);
    return chaeckStatus(response);
  } catch (e) {
    Taro.showToast({
      title: e.message,
      icon: 'none'
    });
    throw e;
  }
}

export default {
  request,
  /**
   * GET请求封装
   * @param url
   * @param data
   * @param header
   */
  async get(
    url: string,
    data: object = {},
    header: object = {}
  ): Promise<IData> {
    return await request(url, 'GET', data, header);
  },
  /**
   * POST请求封装
   * @param url
   * @param data
   * @param header
   */
  async post(
    url: string,
    data: object = {},
    header: object = {}
  ): Promise<IData> {
    return await request(url, 'POST', data, header);
  }
};
