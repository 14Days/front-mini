import Taro, { useState, useEffect } from '@tarojs/taro';

export function useLoading() {
  const [isloading, setIsloading] = useState<Boolean>(false);

  const changeLoading = (e: Boolean) => setIsloading(e);

  useEffect(() => {
    console.log(isloading);
    if (isloading) {
      Taro.showLoading({
        title: '加载中...',
        mask: true
      });
    } else {
      Taro.hideLoading();
    }
  }, [isloading]);

  return { changeLoading };
}
