import Taro, { Component, Config, useReducer } from '@tarojs/taro'
import { View, Text, Icon } from '@tarojs/components'
import './an_label.scss'


interface label_status {
  name: string;
  idc: number;
}

export default class Anlabel extends Component<label_status> {

    render () {
      
      return (
        <View className='anlabel' >
          <Text className='name'>{this.props.name}</Text> 
        </View>
      )
    }
  }