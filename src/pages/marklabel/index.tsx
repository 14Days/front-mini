import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'

//import { get as getGlobalData } from '../../common/globalData/global_data'

import Labelpage from './label_group/label_group'

export default class Marklabel extends Component {

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
