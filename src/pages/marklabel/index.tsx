import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'

//import { get as getGlobalData } from '../../common/globalData/global_data'

import Labelpage from './label_group/label_group'

export default class Marklabel extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  render () {
    return (
      <View className='marklabel'>
        <Labelpage />
        <Labelpage />
        <Labelpage />
        <Labelpage />
        <Labelpage />
        <Labelpage />
      </View>
    )
  }
}
