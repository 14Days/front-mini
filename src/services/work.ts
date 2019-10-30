import request from '../utils/request';
import { getMarkImgURL, getTagURL, commitUnknownURL } from '../utils/url';


export async function fetchImg() {
  return await request.get(getMarkImgURL, {
    num: 1,
  });
}
  
export async function deliverLabels(id: number, tags: Array<number>, type: number) {
  return await request.post(getTagURL, {
    img_id: id,
    tag: tags,
    type: type
  });
}

export async function shelveImg(imgID: number) {
  return await request.post(commitUnknownURL, {
    img_id: imgID
  });
}