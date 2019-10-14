import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

import './capsule.scss'
import { get as getGlobalData } from '../../../globalData/global_data'

interface pr {
  number: number;
}

export default class Capsule extends Component<pr> {

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
  
    componentWillMount () { }
  
    componentDidMount () { }
  
    componentWillUnmount () { }
  
    componentDidShow () { }
  
    componentDidHide () { }
  
    render () {

      const style = {
          top:  (getGlobalData('statusBarHeight') + 8) + 'px',

      }

      return (
        <View className='capsule' style={style}>
            <Text className='tip'>今日第{this.props.number}张图片</Text>
        </View>
      )
    }
  }