import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { get as getGlobalData } from '../../common/globalData/global_data';

import './index.scss';

interface IProps {
  displayName: boolean;
  number: number;
}

function Capsule(props: IProps) {
  const { number, displayName } = props;
  const handleClick = () => {
    Taro.navigateTo({
      url: '/pages/info/index'
    });
  };

  const userName = getGlobalData('username');

  let textTip: null | React.ReactElement = null;
  if (displayName) {
    textTip = <Text className='tip'>{userName}</Text>;
  } else {
    textTip = <Text className='tip'>今日第{number}张图片</Text>;
  }

  return (
    <View className='capsule' onClick={handleClick}>
      {textTip}
    </View>
  );
}

export default Capsule;
