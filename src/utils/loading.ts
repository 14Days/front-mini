import Taro from '@tarojs/taro'

export function showLoading() {
    Taro.showLoading({
        title: "加载中...",
        mask: true
    });
}

export function hideLoading() {
    Taro.hideLoading();
}