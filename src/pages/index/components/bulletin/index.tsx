import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import style from './index.module.scss';

interface IProps {
  content: string;
}

function Bulletin(props: IProps) {
  const { content } = props;
  return (
    <View className={style.bulletin}>
      <View className={style.linebetween} />
      <Text className={style.title}>告示</Text>
      <Text className={style.content}>{content}</Text>
    </View>
  );
}

export default Bulletin;
