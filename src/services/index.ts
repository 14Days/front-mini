import Taro from '@tarojs/taro';
import request from '../utils/request';
import { shelveURL } from './url';

export async function shelve() {
    const token = Taro.getStorageSync('token')
    return await request.get<string>(shelveURL, {
    }, {
      token: token
    });
  }