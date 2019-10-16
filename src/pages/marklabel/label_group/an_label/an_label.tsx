import Taro, { Component } from '@tarojs/taro';
import { View, Text, Icon } from '@tarojs/components';
import './an_label.scss';

interface label_status {
  ifChoose: boolean;
  name: string;
  id: number;
}

export default class Anlabel extends Component<label_status> {
  render() {
    let styleIc = {
      opacity: 0
    };
    let styleBg = {
      background: '#8A8585'
    };
    if (this.props.ifChoose) {
      styleIc = {
        opacity: 1
      };
      styleBg = {
        background: 'rgba(139, 195, 74, 1);'
      };
    }
    return (
      <View className='anlabel' style={styleBg}>
        <Text className='name'>{this.props.name}</Text>
        <Icon
          size='20'
          className='ic'
          type='success_no_circle'
          color='white'
          style={styleIc}
        />
      </View>
    );
  }
}
