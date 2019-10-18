import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import StatisticsBlock from './statistics_block/statistics_block';
import './statistics.scss';

interface IProps {
  week: number;
  day: number;
}

function statistics(props: IProps) {
  const { week, day } = props;
  return (
    <View className='statistics'>
      <StatisticsBlock desc={'今日'} number={day} />
      <View className='linebetween' />
      <StatisticsBlock desc={'本周'} number={week} />
    </View>
  );
}

export default statistics;
