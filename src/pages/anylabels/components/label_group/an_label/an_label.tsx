import Taro, { Component, Config, useReducer } from '@tarojs/taro'
import { View, Text, Icon } from '@tarojs/components'
import './an_label.scss'


interface label_status {
  name: string;
  idc: number;
}

export default class Anlabel extends Component<label_status> {

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
      let styleIc = {
        opacity: 0,
      }
      let styleBg = {
        background: '#8A8585',
      }
      
      return (
        <View className='anlabel' style={styleBg} >
          <Text className='name'>{this.props.name}</Text> 
        </View>
      )
    }
  }