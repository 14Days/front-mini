import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './shelveBar.scss';

export default class Shelvebar extends Component {
  render() {
    return (
      <View className='shelvebar'>
        <View className='linebetween' />
        <View className='content'>
          <View className='content-left'>
            <Text className='title'>搁置图片</Text>
          </View>
          <View className='content-right'>
            <Text className='tip'>2张图片</Text>
          </View>
        </View>
      </View>
    );
  }
}
