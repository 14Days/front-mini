import Taro, { Component, Config } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import Capsule from '../../components/capsule';
import Headswiper from './components/head_swiper/head_swiper';
import Statistics from './components/statistics/statistics';
import Bulletin from './components/bulletin/bulletin';
import Shelvebar from './components/shelveBar/shelveBar';

import './index.scss';

export default class Index extends Component {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages:[
    ],
    //navigationBarTitleText: '首页'
    navigationStyle: 'custom'
  };

  render() {
    return (
      <View className='index'>
        <Headswiper />
        <Capsule number={0} displayName={true}/>
        <View className='welcome'>
          <Text>欢迎您 亲爱的设计师</Text>
        </View>
        <Statistics />
        <Bulletin />
        <Shelvebar />
      </View>
    );
  }
}
