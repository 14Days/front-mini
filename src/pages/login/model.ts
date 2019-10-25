import Taro from '@tarojs/taro';
import { fetchLogin } from '../../services/login';

export default {
  namespace: 'login',
  state: {
    username: '',
    password: ''
  },
  reducers: {
    save(state, { payload: data }) {
      return {
        ...state,
        ...data
      };
    }
  },
  effects: {
    *handlerLogin(_, { select, call }) {
      const { username, password } = yield select(state => state.login);
      if (username === '' || password === '') {
        Taro.showToast({
          icon: 'none',
          title: '请检查必填项'
        });
        return;
      }
      try {
        Taro.showLoading({
          title: '加载中...',
          mask: true
        });
        const res = yield call(fetchLogin, username, password);
        Taro.hideLoading();
        Taro.setStorageSync('token', res.data);
        Taro.reLaunch({
          url: '/pages/index/index'
        });
      } catch (e) {
        Taro.hideLoading();
        Taro.showToast({
          icon: 'none',
          title: e.message
        });
      }
    }
  }
};
