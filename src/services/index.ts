import request from '../utils/request';
import { getNoticeURL, getStatisticDataURL, getCycleImginURL } from '../utils/url';

export async function fetchCycle() {
  return await request.get(getNoticeURL);
}

export async function fetchCount() {
  return await request.get(getStatisticDataURL);
}

export async function fetchNotice() {
  return await request.get(getCycleImginURL);
}
