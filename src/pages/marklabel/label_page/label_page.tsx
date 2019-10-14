import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './label_page.scss'

import Anlabel from './an_label/an_label'


export default class Labelpage extends Component {

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
      const arr = [
        {
          name: '黄色',
          id: 23,
          ifChoose: false,
        },
        {
          name: '绿色',
          id: 25,
          ifChoose: true,
        },
        {
          name: '黄色',
          id: 23,
          ifChoose: false,
        },
        {
          name: '绿色',
          id: 25,
          ifChoose: true,
        },
        {
          name: '黄色',
          id: 23,
          ifChoose: false,
        },
        {
          name: '绿色',
          id: 25,
          ifChoose: true,
        },
        {
          name: '黄色',
          id: 23,
          ifChoose: false,
        },
        {
          name: '绿色',
          id: 25,
          ifChoose: true,
        },
      ]
      return (
        <View className='labelpage'>
          <Text className='title'>色系</Text>
          <View className='labels'>
            {arr.map(ele => 
                <Anlabel key={ele.id} name={ele.name} id={ele.id} ifChoose={ele.ifChoose} />
              )
            }
          </View>
        </View>
      )
    }
  }