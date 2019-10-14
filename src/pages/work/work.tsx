import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './work.scss'

import StatusBar from './statusBar/statusBar'
import Head from './head/head'
import Capsule from './capsule/capsule'
import Labelpage from './label_page/label_page'
import Headstand from './head_stand/head_stand'
import OperateBar from './operate_bar/operate_bar'

export default class Work extends Component {

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
      <View className='doing'>
        <StatusBar />
        <Head />
        <Capsule number={5}/>
        <OperateBar />
        <Headstand />
        <Labelpage />
        <Labelpage />
        <Labelpage />
        <View className='takeplace' />
      </View>
    )
  }
}
