import Taro from '@tarojs/taro';
import {fetchLogin} from '../../services/login';
import dayjs from 'dayjs'

export default {
  namespace: 'login',
  state: {
    username: '',
    password: ''
  },
  reducers: {
    save(state, {payload: data}) {
      return {
        ...state,
        ...data
      };
    }
  },
  effects: {
    * handlerLogin(_, {select, call}) {
      try {
        const {username, password} = yield select(state => state.login);
        if (username === '' || password === '') {
          Taro.showToast({
            icon: 'none',
            title: '请检查必填项'
          });
          return;
        }
        Taro.showLoading({
          title: '加载中...',
          mask: true
        });

        const res = yield call(fetchLogin, username, password);
        const now = dayjs(); // 获取当前时间
        let expire; //计算出过期时间
        if (process.env.NODE_ENV === 'development')
          expire = now.add(300, 'second');
        else
          expire = now.add(5, 'day');
        console.log(expire);
        Taro.hideLoading();
        Taro.setStorageSync('token', res.data);
        Taro.setStorageSync('expire', expire);
        Taro.setStorageSync('username', username);
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
