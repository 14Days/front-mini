import {fetchCount, fetchCycle, fetchNotice} from '../../services/';
import {showLoading, hideLoading} from '../../utils/loading'
import Taro from '@tarojs/taro';
import dayjs from 'dayjs';

export default {
  namespace: 'index',
  state: {
    bulletinWord: '',
    dayNumber: 0,
    weekNumber: 0,
    cyclePhoto: []
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
    * handleInit(_, {all, call, put}) {
      showLoading();
      const expire = Taro.getStorageSync('expire');
      const now = dayjs();

      // 过期
      if (now.isAfter(expire)) {
        Taro.showToast({
          icon: 'none',
          title: '您的登陆信息已过期,请重新登陆'
        }).then(() => {
          hideLoading();
          Taro.redirectTo({
            url: '/pages/login/index'
          });
        });
      }
      const [count, cycle, notice] = yield all([
        call(fetchCount),
        call(fetchCycle),
        call(fetchNotice)
      ]);
      yield put({
        type: 'save',
        payload: {
          bulletinWord: notice.data,
          dayNumber: count.data.day,
          weekNumber: count.data.week,
          cyclePhoto: cycle.data
        }
      });
      hideLoading();
    },
    * handleRefresh(_, {put}) {
      const count = yield fetchCount();
      yield put({
        type: 'save',
        payload: {
          dayNumber: count.data.day,
          weekNumber: count.data.week,
        }
      });
    }
  }
};
