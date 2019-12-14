import Taro from '@tarojs/taro';
import request from '../utils/request';
import {
  getNoticeURL,
  getStatisticDataURL,
  getCycleImginURL,
  getUnknownURL,
  getMarkImgURL,
} from '../utils/url';

export async function fetchCycle() {
  return await request.get(getCycleImginURL);
}

export async function fetchCount() {
  return await request.get(getStatisticDataURL);
}

export async function fetchNotice() {
  return await request.get(getNoticeURL);
}

export async function fetchImg() {
  const token = Taro.getStorageSync('token');
  return await request.get(
    getMarkImgURL,
    {
      num: 4,
    },
    {
      token,
    },
  );
}

export async function fetchShelve() {
  const token = Taro.getStorageSync('token');
  return await request.get(getUnknownURL, {}, {token});
}
