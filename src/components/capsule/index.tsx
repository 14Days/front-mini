import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';

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

  const userName =Taro.getStorageSync('username');

  //获取状态栏高度并决定实际胶囊据顶端高度，必要
  const statusBarHeight = Taro.getSystemInfoSync().statusBarHeight
  const style = {
    top: statusBarHeight + 8 + 'px'
  }

  let textTip: null | React.ReactElement = null;
  if (displayName) {
    textTip = <Text className='tip'>{userName}</Text>;
  } else {
    textTip = <Text className='tip'>今日第{number}张图片</Text>;
  }

  return (
    <View className='capsule' style={style} onClick={handleClick}>
      {textTip}
    </View>
  );
}

export default Capsule;
