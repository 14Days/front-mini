import Taro from '@tarojs/taro';
import { View, Image, Swiper, SwiperItem } from '@tarojs/components';
import samplePic0 from '../../../../static/images/3997/39974737/v2_pyzne4.jpg';
import samplePic1 from '../../../../static/images/3997/39974739/v2_pyznei.jpg';
import samplePic2 from '../../../../static/images/3997/39974774/v2_pyzngx.jpg';

import style from './index.module.scss';

function HeadSwiper() {
  const samplePic = [samplePic0, samplePic1, samplePic2];

  return (
    <Swiper
      className={style.head}
      autoplay={true}
      interval={3000}
      circular={true}
    >
      {samplePic.map(pic => (
        <SwiperItem>
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
