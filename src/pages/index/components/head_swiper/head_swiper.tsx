import Taro, { Component } from '@tarojs/taro'
import { View, Image, Swiper, SwiperItem} from '@tarojs/components'
import samplePic0 from '../../../../static/images/3997/39974737/v2_pyzne4.jpg'
import samplePic1 from '../../../../static/images/3997/39974739/v2_pyznei.jpg'
import samplePic2 from '../../../../static/images/3997/39974774/v2_pyzngx.jpg'
import './head_swiper.scss'


export default class Headswiper extends Component {
  
  // 样例轮播图片
  samplePic = [
      samplePic0,
      samplePic1,
      samplePic2,
  ]  

  render () {
    return (
      <Swiper
        className='head'
        autoplay={true}
        interval={3000}
        circular={true} >
          {
            this.samplePic.map( (pic) => 
              <SwiperItem>
                <View>
                  <Image src={pic} mode='aspectFill' className='swiperimg'></Image>
                </View>
              </SwiperItem>
            )
          }
      </Swiper>
    )
  }
}