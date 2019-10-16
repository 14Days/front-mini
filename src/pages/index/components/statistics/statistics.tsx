import Taro, { Component, Config } from '@tarojs/taro';
import { View } from '@tarojs/components';

import './statistics.scss';

import StatisticsBlock from './statistics_block/statistics_block';

export default class statistics extends Component {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    //navigationBarTitleText: '首页'
  };

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className='statistics'>
        <StatisticsBlock desc={'今日'} number={245} />
        <View className='linebetween' />
        <StatisticsBlock desc={'本周'} number={2245} />
      </View>
    );
  }
}
