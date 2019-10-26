import request from '../utils/request';
import { noticeURL, countURL, cycleURL } from './url';

export async function fetchCycle() {
  return await request.get(cycleURL);
}

export async function fetchCount() {
  return await request.get(countURL);
}

export async function fetchNotice() {
  return await request.get(noticeURL);
}
