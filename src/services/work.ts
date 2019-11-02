import request from '../utils/request';
import { commitTagURL, commitUnknownURL, getTagURL } from '../utils/url';

export async function fetchTag() {
  return await request.get(getTagURL);
}

export async function commitTagInfo(img_id: number, tag: Array<number>) {
  const token = Taro.getStorageSync('token');
  return await request.post(commitTagURL,{
    img_id,
    tag
  },{token})
}

export async function shelveImg(imgID: number,) {
  const token = Taro.getStorageSync('token');
  return await request.get<string>(commitUnknownURL, {
    img_id: imgID
  }, {token});
}
