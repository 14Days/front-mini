import request from '../utils/request';
import { getNoticeURL, getStatisticDataURL, getCycleImginURL, getUnknownURL, commitUnknownURL, getTagURL, getMarkImgURL } from '../utils/url';

export async function fetchCycle() {
  return await request.get(getCycleImginURL);
}

export async function fetchCount() {
  return await request.get(getStatisticDataURL);
}

export async function fetchNotice() {
  return await request.get(getNoticeURL);
}

export async function fetchShelve() {
  return await request.get(getUnknownURL);
}

export async function passShelve(imgID) {
  return await request.post(commitUnknownURL, {
    img_id: imgID,
  })
}

export async function submitLabels(id, tags) {
  return await request.post(getTagURL, {
    img_id: id,
    tag: tags
  })
}

export async function fetchImg() {
  return await request.get(getMarkImgURL, {
    num: 4
  })
}
