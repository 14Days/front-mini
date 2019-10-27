import Taro from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import style from './index.module.scss';
import arrow_right from '../../../../static/icon/arrow_right.png'

function ShelveBar() {
  return (
    <View className={style.shelvebar} onClick={() => {Taro.navigateTo({url: '../shelve/index'})}}>
      <View className={style.linebetween} />
      <View className={style.content}>
        <View className={style.contentLeft}>
          <Text>搁置图片</Text>
        </View>
        <View className={style.contentRight}>
          <Image className={style.img} src={arrow_right} mode='aspectFit'/>
        </View>
      </View>
    </View>
  );
}

export default ShelveBar;
