import Taro from '@tarojs/taro';
import {View, Image, Swiper, SwiperItem} from '@tarojs/components';

import style from './index.module.scss';

interface IProps {
  pics: string[];
}

function HeadSwiper({pics}: IProps) {
  return (
    <Swiper
      className={style.head}
      autoplay={true}
      interval={3000}
      circular={true}>
      {pics.map(pic => {
        return (
          <SwiperItem key={pic}>
            <View>
              <Image
                src={`http://pull.wghtstudio.cn/img/${pic}`}
                mode="aspectFill"
                className={style.swiperimg}
              />
            </View>
          </SwiperItem>
        );
      })}
    </Swiper>
  );
}

HeadSwiper.defaultProps = {
  pics: [],
};

export default HeadSwiper;
