import {fetchCount, fetchCycle, fetchNotice} from '../../services/';
import {showLoading, hideLoading} from '../../utils/loading';

export default {
  namespace: 'index',
  state: {
    bulletinWord: '',
    dayNumber: 0,
    weekNumber: 0,
    cyclePhoto: [],
  },
  reducers: {
    save(state, {payload: data}) {
      return {
        ...state,
        ...data,
      };
    },
  },
  effects: {
    *handleInit(_, {all, call, put}) {
      try {
        showLoading();
        const [count, cycle, notice] = yield all([
          call(fetchCount),
          call(fetchCycle),
          call(fetchNotice),
        ]);
        yield put({
          type: 'save',
          payload: {
            bulletinWord: notice.data,
            dayNumber: count.data.day,
            weekNumber: count.data.week,
            cyclePhoto: cycle.data,
          },
        });
        hideLoading();
      } catch (e) {
        console.log(e.message);
      }
    },
    *handleRefresh(_, {put}) {
      const count = yield fetchCount();
      yield put({
        type: 'save',
        payload: {
          dayNumber: count.data.day,
          weekNumber: count.data.week,
        },
      });
    },
  },
};
