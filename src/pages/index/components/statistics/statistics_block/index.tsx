import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import style from './index.module.scss';

interface IProps {
  desc: string;
  number: number;
}

function StatisticsBlock(props: IProps) {
  const { desc, number } = props;
  return (
    <View className={style.statistics}>
      <Text className={style.title}>{desc}打标图片</Text>
      <Text className={style.number}>{number}</Text>
    </View>
  );
}

export default StatisticsBlock;
