import request from '../utils/request';
import Taro from '@tarojs/taro'
import {
  getNoticeURL,
  getStatisticDataURL,
  getCycleImginURL,
  getUnknownURL,
  getMarkImgURL
} from '../utils/url';

//获取轮播图
export async function fetchCycle() {
  return await request.get(getCycleImginURL);
}

//获取统计数据
export async function fetchCount() {
  return await request.get(getStatisticDataURL);
}

//获取公告
export async function fetchNotice() {
  return await request.get(getNoticeURL);
}

export async function fetchImg() {
  const token = Taro.getStorageSync('token');
  return await request.get(getMarkImgURL, {
    num: 4
  },{
    token
  })
}

export async function fetchShelve(){
  const token = Taro.getStorageSync('token');
  return await request.get(getUnknownURL,{},{token})
}
