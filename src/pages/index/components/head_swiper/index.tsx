import Taro from '@tarojs/taro';
import { View, Image, Swiper, SwiperItem } from '@tarojs/components';

import style from './index.module.scss';

function HeadSwiper({ pics }: Readonly<any>) {
  return (
    <Swiper
      className={style.head}
      autoplay={true}
      interval={3000}
      circular={true}
    >
      {pics.pics.map(pic => {
        console.log(pic);
        return (
        <SwiperItem key={pic}>
          <View>
            <Image
              src={'http://pull.wghtstudio.cn/img/' + pic}
              mode='aspectFill'
              className={style.swiperimg}
            ></Image>
          </View>
        </SwiperItem>
        )
      })}
    </Swiper>
  );
}

export default HeadSwiper;
