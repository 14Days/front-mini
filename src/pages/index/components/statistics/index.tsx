import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import StatisticsBlock from './statistics_block';
import style from './index.module.scss';

interface IProps {
  week: number;
  day: number;
}

function Statistics(props: IProps) {
  const { week, day } = props;
  return (
    <View className={style.statistics}>
      <StatisticsBlock desc={'今日'} number={day} />
      <View className={style.linebetween} />
      <StatisticsBlock desc={'本周'} number={week} />
    </View>
  );
}

export default Statistics;
