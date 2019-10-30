import Taro from '@tarojs/taro'
import {View, Image} from '@tarojs/components'

import './head_img.scss'
import {useDispatch} from "@tarojs/redux";

// 传递url
export default function Head(props) {
  const dispatch = useDispatch();
  return (
    <View>
      <Image
        src={props.url}
        mode='aspectFill'
        className='header'
        onLoad={() => {dispatch({
          type: 'work/handleImgOnLoad'
        })}}
      />
    </View>
  )
}
