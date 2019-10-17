import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './label_page.scss';

import Anlabel from './an_label/an_label';

export default class Labelpage extends Component {
  render() {
    const arr = [
      {
        name: '黄色',
        id: 23,
        ifChoose: false
      },
      {
        name: '绿色',
        id: 25,
        ifChoose: true
      },
      {
        name: '黄色',
        id: 23,
        ifChoose: false
      },
      {
        name: '绿色',
        id: 25,
        ifChoose: true
      },
      {
        name: '黄色',
        id: 23,
        ifChoose: false
      },
      {
        name: '绿色',
        id: 25,
        ifChoose: true
      },
      {
        name: '黄色',
        id: 23,
        ifChoose: false
      },
      {
        name: '绿色',
        id: 25,
        ifChoose: true
      }
    ];
    return (
      <View className='labelpage'>
        <Text className='title'>色系</Text>
        <View className='labels'>
          {arr.map(ele => (
            <Anlabel
              key={ele.id}
              name={ele.name}
              id={ele.id}
              ifChoose={ele.ifChoose}
            />
          ))}
        </View>
      </View>
    );
  }
}
