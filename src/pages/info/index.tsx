import Taro, { Component, Config } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { get as getGlobalData } from '../../common/globalData/global_data';

import './index.scss';

export default class Info extends Component {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '关于'
  };

  render() {
    //        <StatusBar />
    const id = getGlobalData('id');
    return (
      <View className='info'>
        <Text className='text_id'>您的唯一识别ID： {id}</Text>
      </View>
    );
  }
}
