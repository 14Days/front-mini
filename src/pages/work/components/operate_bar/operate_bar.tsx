import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'

import './operate_bar.scss'


export default class Operatebar extends Component {

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
    
      return (
        <View className='header'>
          <Button className='abutton'>不确定，先搁置</Button>
          <Button className='abutton'>确定，下一张</Button>
        </View>
      )
    }
  }