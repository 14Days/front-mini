import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './statistics_block.scss';

interface Iprops {
  desc: string;
  number: number;
}

export default class StatisticsBlock extends Component<Iprops> {
  render() {
    return (
      <View className='statistics'>
        <Text className='title'>{this.props.desc}打标图片</Text>
        <Text className='number'>{this.props.number}</Text>
      </View>
    );
  }
}
