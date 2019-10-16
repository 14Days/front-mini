import Taro, { Component, Config, useReducer } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './label_page.scss'

import Anlabel from './an_label/an_label'

interface onePageLabel {
  title: String;
  labels: Array<Object>;
  pageid: number;
  doing: Function;

}

export default class Labelpage extends Component<onePageLabel> {

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
      //不能命名成预留关键字id 否则传参失效 只能命名成idc
      return (
        <View className='labelpage'>
          <Text className='title'>{this.props.title}</Text>
          <View className='labels'>
            {this.props.labels.map((ele) => 
                <Anlabel key={ele.id} pageid={this.props.pageid} name={ele.name} idc={ele.id} ifChoose={ele.ifChoose} doing={this.props.doing}/>
              )
            }
          </View>
        </View>
      )
    }
  }