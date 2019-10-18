import Taro, { Component, Config } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { get as getGlobalData } from '../../common/globalData/global_data';

import './index.scss';

export default class Info extends Component {
  config: Config = {
    navigationBarTitleText: '关于'
  };

  render() {
    const id = getGlobalData('id');
    return (
      <View className='info'>
        <Text className='text_id'>您的唯一识别ID： {id}</Text>
      </View>
    );
  }
}
