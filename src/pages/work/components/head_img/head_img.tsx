import Taro, { Component } from '@tarojs/taro'
import { View, Image} from '@tarojs/components'
import './head_img.scss'

interface head_img_info {
  url: string,
}

// 传递url
export default class head extends Component<head_img_info> {
  
    render () {
      return (
        <View>
          <Image src={this.props.url} mode='aspectFill' className='header' />
        </View>
      )
    }
  }
