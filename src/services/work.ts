import request from '../utils/request';
import { imgURL, submitURL } from './url';

export async function fetchImg() {
  return await request.get<string>(imgURL, {
    num: 1
  });
}
  
export async function deliverLabels(id: number, tags: Array<number>) {
    return await request.post<string>(submitURL, {
        img_id: id,
        tag: tags
    });
}