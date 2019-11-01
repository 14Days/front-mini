import Taro from '@tarojs/taro';
import {View, Text} from '@tarojs/components';
import './label_group.scss';

import Anlabel from './an_label/an_label';


export default function Labelpage(props) {
  //不能命名成预留关键字id 否则传参失效 只能命名成idc
  return (
    <View className='labelpage'>
      <Text className='title'>{props.title}</Text>
      <View className='labels'>
        {props.labels.map(ele => (
          <Anlabel
            key={ele.tag}
            tagID={ele.id}
            name={ele.tag}
          />
        ))}
      </View>
    </View>
  );
}
