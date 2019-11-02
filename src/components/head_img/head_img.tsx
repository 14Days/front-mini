import Taro from '@tarojs/taro'
import {View, Image} from '@tarojs/components'
import {useDispatch} from "@tarojs/redux";

import './head_img.scss'


// 传递url
export default function Head(props) {
  const dispatch = useDispatch();
  return (
    <View>
      <Image
        src={`http://pull.wghtstudio.cn/img/${props.url}`}
        mode='aspectFill'
        className='header'
        onLoad={() => {
          dispatch({
            type: 'work/triggerLoad'
          })
        }}
      />
    </View>
  )
}
