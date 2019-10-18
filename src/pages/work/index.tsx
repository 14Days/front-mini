import Taro, { Component, Config, useReducer } from '@tarojs/taro';
import { View } from '@tarojs/components';
import Headimg from './components/head_img/head_img';
import Capsule from '../../components/capsule';
import Labelpage from './components/label_group/label_group';
import Headstand from './components/head_stand/head_stand';
import OperateBar from './components/operate_bar/operate_bar';
import samplePic from '../../static/images/3997/39974737/v2_pyzne4.jpg';

import './index.scss';

export default class Index extends Component {
  config: Config = {
    navigationStyle: 'custom'
  };

  // 一组对象的形式：
  // title： String
  // pageid: number (组id)
  // label： Array (下方到AnLabel)

  //pageid一定要对
  arrs = [
    {
      title: '色系',
      pageid: 0,
      labels: [
        {
          name: '黄色',
          id: 1,
          ifChoose: false
        },
        {
          name: '绿色',
          id: 2,
          ifChoose: false
        },
        {
          name: '黄色',
          id: 3,
          ifChoose: false
        },
        {
          name: '绿色',
          id: 4,
          ifChoose: false
        },
        {
          name: '黄色',
          id: 5,
          ifChoose: false
        },
        {
          name: '绿色',
          id: 6,
          ifChoose: false
        },
        {
          name: '黄色',
          id: 7,
          ifChoose: false
        },
        {
          name: '绿色',
          id: 8,
          ifChoose: false
        }
      ]
    },
    {
      title: '号牌',
      pageid: 1,
      labels: [
        {
          name: '黄色',
          id: 9,
          ifChoose: false
        },
        {
          name: '绿色',
          id: 10,
          ifChoose: false
        },
        {
          name: '黄色',
          id: 11,
          ifChoose: false
        },
        {
          name: '绿色',
          id: 12,
          ifChoose: false
        },
        {
          name: '黄色',
          id: 13,
          ifChoose: false
        },
        {
          name: '绿色',
          id: 14,
          ifChoose: false
        },
        {
          name: '黄色',
          id: 15,
          ifChoose: false
        },
        {
          name: '绿色',
          id: 16,
          ifChoose: false
        }
      ]
    }
  ];

  //更改处理器
  changeDisplay = (state, action) => {
    let v = JSON.parse(JSON.stringify(state));
    for (let i = 0; i < v.length; i++) {
      if (v[i].pageid == action.pageid) {
        for (let j = 0; j < v[i].labels.length; j++) {
          if (v[i].labels[j].id == action.id) {
            v[i].labels[j].ifChoose = !state[i].labels[j].ifChoose;
            return v;
          }
        }
      }
    }
    return v;
  };

  render() {
    //useReducer管理整个标签面板
    const [state, dispatch] = useReducer(this.changeDisplay, this.arrs);

    return (
      <View className='doing'>
        <Headimg url={samplePic} />
        <Headstand />
        <Capsule number={5} displayName={false} />
        <OperateBar />

        {state.map(ele => {
          return (
            <Labelpage
              key={ele.pageid}
              title={ele.title}
              labels={ele.labels}
              doing={dispatch}
              pageid={ele.pageid}
            />
          );
        })}
        <View className='takeplace' />
      </View>
    );
  }
}
