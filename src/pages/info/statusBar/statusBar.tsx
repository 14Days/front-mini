import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

import { get as getGlobalData } from '../../../globalData/global_data'
import './statusBar.scss'

export default class head extends Component {

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
      const barHight = getGlobalData('statusBarHeight')
      const style = {
        height: (44 + barHight) + 'px', 
      }
      const style0 = {
        top: (12 + barHight) + 'px',
      }
      return (
        <View style={style} className='statusbar' >
          <Text className='title' style={style0}>关于</Text>
        </View>
      )
    }
  }