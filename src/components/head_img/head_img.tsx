import Taro from '@tarojs/taro'
import {View, Image} from '@tarojs/components'

import './head_img.scss'

// 传递url
export default function Head(props) {
  return (
    <View>
      <Image
        src={`http://pull.wghtstudio.cn/img/${props.url}`}
        mode='aspectFill'
        className='header'
      />
    </View>
  )
}
