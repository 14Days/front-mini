import Taro from '@tarojs/taro';
import request from '../utils/request';
import { getMarkImgURL, commitTagURL, commitUnknownURL, getTagURL } from '../utils/url';

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

export async function fetchTag() {
  return await request.get(getTagURL);
}

export async function commitTagInfo(img_id: number, tag: Array<number>) {
  return await request.post(commitTagURL,{
    img_id,
    tag
  })
}

export async function shelveImg(imgID: number,) {
  const token = Taro.getStorageSync('token');
  return await request.get<string>(commitUnknownURL, {
    img_id: imgID
  }, {
    token: token
  });
}
