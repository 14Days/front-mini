import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

import './index.scss'
import { get as getGlobalData } from '../../common/globalData/global_data'

interface capsule_info {
  displayName: boolean;
  number: number;
}

export default class Capsule extends Component<capsule_info> {

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
        url: '/pages/info/index'
      })
    }

    render () {

      const style = {
          top:  (getGlobalData('statusBarHeight') + 8) + 'px',

      }
      const userName = getGlobalData('userName');
      let textTip = null;
      if (this.props.displayName) {
        textTip = <Text className='tip'>{userName}</Text>
      } else {
        textTip = <Text className='tip'>今日第{this.props.number}张图片</Text>
      }
      return (
        <View className='capsule' style={style} onClick={this.handleClick}>
            {textTip}
        </View>
      )
    }
  }
