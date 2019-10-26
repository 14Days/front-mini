import Taro, { Component, Config } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './label_group.scss';

import Anlabel from './an_label/an_label';

interface onePageLabel {
  title: String;
  labels: Array<Object>;
  pageid: number;
  doing: Function;
}

export default class Labelpage extends Component<onePageLabel> {
  static defaultProps = {
    labels: []
  };
  
  render() {
    //不能命名成预留关键字id 否则传参失效 只能命名成idc
    return (
      <View className='labelpage'>
        <Text className='title'>{this.props.title}</Text>
        <View className='labels'>
          {this.props.labels.map(ele => (
            <Anlabel
              key={ele.id}
              pageid={this.props.pageid}
              name={ele.name}
              idc={ele.id}
              ifChoose={ele.ifChoose}
              doing={this.props.doing}
            />
          ))}
        </View>
      </View>
    );
  }
}
