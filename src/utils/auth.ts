import Taro from '@tarojs/taro';
import dayjs from 'dayjs';

export default function(): boolean {
  const token: string = Taro.getStorageSync('token');
  const expire = Taro.getStorageSync('expire');
  const now = dayjs();

  if (now.isAfter(expire) || !token) {
    Taro.hideLoading();
    Taro.redirectTo({
      url: '/pages/login/index',
    });
    return true;
  }
  return false;
}
