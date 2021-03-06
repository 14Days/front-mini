import Taro, { Component, Config } from '@tarojs/taro';
import { Provider } from '@tarojs/redux';
import '@tarojs/async-await';
import dva from './utils/dva';
import models from './models';
import Index from './pages/index';

import './app.scss';

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const dvaApp = dva.createApp({
  initialState: {},
  models: models
});

const store = dvaApp.getStore();

class App extends Component {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/index/index',
      'pages/work/index',
      'pages/info/index',
      'pages/login/index',
      'pages/register/index',
      'pages/shelve/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: '#CDCDCD',
      selectedColor: '#333333',
      backgroundColor: '#F7F7F7',
      borderStyle: 'black',
      list: [
        {
          pagePath: 'pages/index/index',
          text: '首页',
          iconPath: 'static/icon/ushouye.png',
          selectedIconPath: 'static/icon/shouye.png'
        },
        {
          pagePath: 'pages/work/index',
          text: '开始打标',
          iconPath: 'static/icon/usousuo.png',
          selectedIconPath: 'static/icon/sousuo.png'
        }
      ]
    }
  };

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById('app'));
