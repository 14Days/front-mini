import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

import './index.scss'
import { get as getGlobalData } from '../../globalData/global_data'

export default class Capsule extends Component {

    /**
     * 指定config的类型声明为: Taro.Config
     *
     * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
     * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
     * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
     */
    config: Config = {
      //navigationBarTitleText: '首页'
    }
    
    handleClick() {
      Taro.navigateTo({
        url: '/pages/info/info'
      })
    }

    render () {

      const style = {
          top:  (getGlobalData('statusBarHeight') + 8) + 'px',

      }

      return (
        <View className='capsule' style={style} onClick={this.handleClick}>
            <Text className='tip'>张舜宇</Text>
        </View>
      )
    }
  }
