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
      {pics.map(pic => (
        <SwiperItem key={pic}>
          <View>
            <Image
              src={pic}
              mode='aspectFill'
              className={style.swiperimg}
            ></Image>
          </View>
        </SwiperItem>
      ))}
    </Swiper>
  );
}

export default HeadSwiper;
