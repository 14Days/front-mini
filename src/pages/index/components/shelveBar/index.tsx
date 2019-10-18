import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import style from './index.module.scss';

function ShelveBar() {
  return (
    <View className={style.shelvebar}>
      <View className={style.linebetween} />
      <View className={style.content}>
        <View className={style.contentLeft}>
          <Text>搁置图片</Text>
        </View>
        <View className={style.contentRight}>
          <Text className={style.tip}>2张图片</Text>
        </View>
      </View>
    </View>
  );
}

export default ShelveBar;
