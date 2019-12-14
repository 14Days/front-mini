import {create} from 'dva-core';
import createLoading from 'dva-loading';
import {createLogger} from 'redux-logger';

let app;
let store;
let dispatch;
let registered;

/**
 * @function 创建DvaStore函数
 * @param opt
 */
function createApp(opt) {
  // redux日志
  if (process.env.NODE_ENV === 'development') {
    opt.onAction = [createLogger()];
  }
  app = create(opt);
  app.use(createLoading());

  if (!registered) {
    opt.models.forEach(model => {
      app.model(model);
    });
  }

  registered = true;
  app.start();

  store = app._store;
  app.getStore = () => store;

  dispatch = store.dispatch;
  app.dispatch = dispatch;

  return app;
}

export default {
  createApp,
  getDispatch() {
    return app.dispatch;
  },
};
