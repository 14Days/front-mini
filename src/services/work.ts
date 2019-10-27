import Taro from '@tarojs/taro';
import request from '../utils/request';
import { getMarkImgURL, getTagURL, commitUnknownURL } from '../utils/url';


export async function fetchImg() {
  const token = Taro.getStorageSync('token')
  console.log(token)
  return await request.get<string>(getMarkImgURL, {
    num: 1,
    t: Math.random() * 100
  }, {
    token: token
  });
}
  
export async function deliverLabels(id: number, tags: Array<number>, type: number) {
  const token = Taro.getStorageSync('token')
  console.log(token)
  return await request.post<string>(getTagURL, {
    img_id: id,
    tag: tags,
    type: type
  }, {
    token: token
  });
}

export async function shelveImg(imgID: number) {
  const token = Taro.getStorageSync('token')
  console.log(token)
  return await request.post<string>(commitUnknownURL, {
    img_id: imgID
  }, {
    token: token
  });
}