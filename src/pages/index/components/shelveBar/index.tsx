import Taro from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import style from './index.module.scss';
import arrow_right from '../../../../static/icon/arrow_right.png';
import {fetchShelve} from "../../../../services";

function ShelveBar() {
  async function solveShelve(){
    const res = await fetchShelve();
    console.log(res);
    if(res.data.length === 0){
      Taro.showToast({
        icon:'none',
        title: '您完成了所有的搁置任务!'
      })
    } else {
      Taro.navigateTo({url: '../shelve/index'})
    }
  }
  return (
    <View className={style.shelvebar} onClick={solveShelve}>
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
