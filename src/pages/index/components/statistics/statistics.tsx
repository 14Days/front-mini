import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import StatisticsBlock from './statistics_block/statistics_block';
import './statistics.scss';

interface statistics_info {
  week: number;
  day: number;
}

export default class statistics extends Component<statistics_info> {
  render() {
    return (
      <View className='statistics'>
        <StatisticsBlock desc={'今日'} number={this.props.day} />
        <View className='linebetween' />
        <StatisticsBlock desc={'本周'} number={this.props.week} />
      </View>
    );
  }
}
