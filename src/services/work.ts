import Taro from '@tarojs/taro';
import request from '../utils/request';
import { imgURL, submitURL, shelveImgURL } from './url';


export async function fetchImg() {
  const token = Taro.getStorageSync('token')
  console.log(token)
  return await request.get<string>(imgURL, {
    num: 1,
    t: Math.random() * 100
  }, {
    token: token
  });
}
  
export async function deliverLabels(id: number, tags: Array<number>) {
  const token = Taro.getStorageSync('token')
  console.log(token)
  return await request.post<string>(submitURL, {
    img_id: id,
    tag: tags
  }, {
    token: token
  });
}

export async function shelveImg(imgID: number) {
  const token = Taro.getStorageSync('token')
  console.log(token)
  return await request.post<string>(shelveImgURL, {
    img_id: imgID
  }, {
    token: token
  });
}