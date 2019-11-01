import request from '../utils/request';
import { getNoticeURL, getStatisticDataURL, getCycleImginURL, getUnknownURL, commitUnknownURL, getTagURL, getMarkImgURL } from '../utils/url';

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

//获取被搁置图片
export async function fetchShelve() {
  return await request.get(getUnknownURL);
}

//请求图片放入搁置
export async function passShelve(imgID) {
  return await request.post(commitUnknownURL, {
    img_id: imgID,
  })
}

//上传打标
export async function submitLabels(id, tags) {
  return await request.post(getTagURL, {
    img_id: id,
    tag: tags
  })
}

//请求普通图片
export async function fetchImg() {
  return await request.get(getMarkImgURL, {
    num: 4
  })
}
