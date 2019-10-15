import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

//import StatusBar from './statusBar/statusBar'
import Head from '../../components/head/head'
import Capsule from '../../components/capsule/capsule'
import Statistics from './statistics/statistics'
import Bulletin from './bulletin/bulletin'
import Shelvebar from './shelveBar/shelveBar'
//全局变量
//import { get as getGlobalData } from '../../globalData/global_data'

import './index.scss'



export default class Index extends Component {

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
    //        <StatusBar />

    return (
      <View className='index' >

        <Head />
        <Capsule />
        <View className='welcome'>
          <Text >欢迎您 亲爱的设计师</Text>
        </View>
        <Statistics />
        <Bulletin />
        <Shelvebar />
      </View>
    )
  }
}
