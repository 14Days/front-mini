import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'

import './head_stand.scss'


export default class Headstand extends Component {

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
        height: 234 + 'px', 
        width: '100%',
      }
      return (
        <View className='header'>
          <View style={style} ></View>
        </View>
      )
    }
  }