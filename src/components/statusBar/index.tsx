import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { get as getGlobalData } from '../../common/globalData/global_data';

import './index.scss';

function Head() {
  const barHight = getGlobalData('statusBarHeight');

  const style = {
    height: `44${barHight}px`
  };
  const style0 = {
    top: `12${barHight}px`
  };

  return (
    <View style={style} className='statusbar'>
      <Text className='title' style={style0}>
        关于
      </Text>
    </View>
  );
}

export default Head;
