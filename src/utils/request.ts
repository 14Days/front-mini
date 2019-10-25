import Taro from '@tarojs/taro';
import { IResponse, IData } from '../types/request';

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
function chaeckStatus<T = any>(data: IData<T>): IData<T> {
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
async function request<T = any>(
  url: string,
  method: 'GET' | 'POST',
  data: object = {},
  header: object = {}
): Promise<IData<T>> {
  try {
    const token = Taro.getStorageSync('token');
    const response: IResponse = await Taro.request({
      url: url,
      header: token ? { ...header, token: token } : { ...header },
      method: method,
      data: data
    });
    checkStatusCode(response);
    const result = response.data as IData<T>;
    return chaeckStatus(result);
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
  async get<T = any>(
    url: string,
    data: object = {},
    header: object = {}
  ): Promise<IData<T>> {
    return await request<T>(url, 'GET', data, header);
  },
  /**
   * POST请求封装
   * @param url
   * @param data
   * @param header
   */
  async post<T = any>(
    url: string,
    data: object = {},
    header: object = {}
  ): Promise<IData<T>> {
    return await request<T>(url, 'POST', data, header);
  }
};
