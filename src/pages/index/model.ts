import { fetchCount, fetchCycle, fetchNotice,fetchShelve } from '../../services/index';

export default {
  namespace: 'index',
  state: {
    bulletinWord: '',
    dayNumber: 0,
    weekNumber: 0,
    cyclePhoto: [],
    shelveNumber: 0
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
    *handleInit(_, { all, call, put }) {
      const [count, cycle, notice, shelve] = yield all([
        call(fetchCount),
        call(fetchCycle),
        call(fetchNotice),
        call(fetchShelve)
      ]);
      const temp: string[] = [];
      cycle.data.forEach(item => {
        temp.push(`http://pull.wghtstudio.cn/img/${item}`);
      });
      yield put({
        type: 'save',
        payload: {
          bulletinWord: notice.data,
          dayNumber: count.data.day,
          weekNumber: count.data.week,
          cyclePhoto: temp,
          shelveNumber: shelve.data.length
        }
      });
    }
  }
};
