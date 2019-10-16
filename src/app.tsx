import Taro, { Component, Config } from '@tarojs/taro';
import Index from './pages/index';
import './app.scss';
//全局变量
import { set as setGlobalData } from './common/globalData/global_data';

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

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
      'pages/marklabel/index',
      'pages/info/index',
      'pages/login/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: '#101010 100%',
      selectedColor: '#EAB95D 100%',
      backgroundColor: '#F7F7F7 100%',
      borderStyle: 'black',
      list: [
        {
          pagePath: 'pages/index/index',
          text: '首页'
          //iconPath:
          //selectedIconPath:
        },
        {
          pagePath: 'pages/work/index',
          text: '开始打标'
          //iconPath:
          //selectedIconPath:
        },
        {
          pagePath: 'pages/marklabel/index',
          text: '标签'
          //iconPath:
          //selectedIconPath:
        }
      ]
    }
  };

  componentWillMount() {
    Taro.getSystemInfo().then(res => {
      setGlobalData('statusBarHeight', res.statusBarHeight || 0);
      setGlobalData('id', 'NRGW54E56');
      setGlobalData('userName', '张舜宇')
    });
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return <Index />;
  }
}

Taro.render(<App />, document.getElementById('app'));
