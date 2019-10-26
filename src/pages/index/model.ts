import { fetchCount, fetchCycle, fetchNotice } from '../../services/index';

export default {
  namespace: 'index',
  state: {
    bulletinWord: '',
    dayNumber: 0,
    weekNumber: 0,
    cyclePhoto: []
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
      const [count, cycle, notice] = yield all([
        call(fetchCount),
        call(fetchCycle),
        call(fetchNotice)
      ]);
      const temp: string[] = [];
      console.log(notice)
      yield put({
        type: 'save',
        payload: {
          bulletinWord: notice.data,
          dayNumber: count.data.day,
          weekNumber: count.data.week,
          cyclePhoto: cycle.data
        }
      });
    }
  }
};
