import Taro, { Component, Config, useReducer } from '@tarojs/taro';
import { View } from '@tarojs/components';
import Headimg from './components/head_img/head_img';
import Labelpage from './components/label_group/label_group';
import Headstand from './components/head_stand/head_stand';
import OperateBar from './components/operate_bar/operate_bar';
import { fetchShelve } from '../../services/index';
import { showLoading, hideLoading } from '../../utils/loading';
import './index.scss';

interface workState {
  imgURL: string;
  imgID: number;
}

export default class Index extends Component<null, workState> {
  config: Config = {
    navigationStyle: 'default',
    navigationBarTitleText: '搁置打标'
  };

  constructor(props) {
    super(props);
    this.state = {
      imgURL: '',
      imgID: -1
    };
  }

  defaultArrs = [
    {
      title: '色系',
      pageid: 0,
      labels: [
        {
          name: '红色',
          id: 1,
          ifChoose: false
        },
        {
          name: '绿色',
          id: 2,
          ifChoose: false
        },
        {
          name: '蓝色',
          id: 3,
          ifChoose: false
        },
        {
          name: '紫色',
          id: 4,
          ifChoose: false
        },
        {
          name: '橙色',
          id: 5,
          ifChoose: false
        },
        {
          name: '粉色',
          id: 6,
          ifChoose: false
        },
        {
          name: '黄色',
          id: 7,
          ifChoose: false
        },
        {
          name: '灰色',
          id: 8,
          ifChoose: false
        },
        {
          name: '棕色',
          id: 9,
          ifChoose: false
        },
        {
          name: '白色',
          id: 10,
          ifChoose: false
        }
      ]
    },
    {
      title: '印象',
      pageid: 1,
      labels: [
        {
          name: '可爱的',
          id: 11,
          ifChoose: false
        },
        {
          name: '暖休闲的',
          id: 12,
          ifChoose: false
        },
        {
          name: '动感的',
          id: 13,
          ifChoose: false
        },
        {
          name: '豪华的',
          id: 14,
          ifChoose: false
        },
        {
          name: '粗犷的',
          id: 15,
          ifChoose: false
        },
        {
          name: '浪漫的',
          id: 16,
          ifChoose: false
        },
        {
          name: '自然的',
          id: 17,
          ifChoose: false
        },
        {
          name: '古典的',
          id: 18,
          ifChoose: false
        },
        {
          name: '古典考究的',
          id: 19,
          ifChoose: false
        },
        {
          name: '雅致的',
          id: 20,
          ifChoose: false
        },
        {
          name: '精致的',
          id: 21,
          ifChoose: false
        },
        {
          name: '考究的',
          id: 22,
          ifChoose: false
        },
        {
          name: '高贵的',
          id: 23,
          ifChoose: false
        },
        {
          name: '清爽的',
          id: 24,
          ifChoose: false
        },
        {
          name: '冷休闲的',
          id: 25,
          ifChoose: false
        },
        {
          name: '现代的',
          id: 26,
          ifChoose: false
        }
      ]
    },
    {
      title: '风格',
      pageid: 2,
      labels: [
        {
          name: '美式',
          id: 27,
          ifChoose: false
        },
        {
          name: '北欧',
          id: 28,
          ifChoose: false
        },
        {
          name: '日式',
          id: 29,
          ifChoose: false
        },
        {
          name: '现代',
          id: 30,
          ifChoose: false
        },
        {
          name: '新中式',
          id: 31,
          ifChoose: false
        },
        {
          name: '传统中式',
          id: 32,
          ifChoose: false
        },
        {
          name: '欧式',
          id: 33,
          ifChoose: false
        },
        {
          name: '混搭',
          id: 34,
          ifChoose: false
        },
        {
          name: '轻奢',
          id: 35,
          ifChoose: false
        },
        {
          name: '新古典',
          id: 36,
          ifChoose: false
        },
        {
          name: '法式',
          id: 37,
          ifChoose: false
        },
        {
          name: '工业',
          id: 38,
          ifChoose: false
        },
        {
          name: '田园',
          id: 39,
          ifChoose: false
        },
        {
          name: '地中海',
          id: 40,
          ifChoose: false
        },
        {
          name: '东南亚',
          id: 41,
          ifChoose: false
        }
      ]
    },
    {
      title: '空间',
      pageid: 3,
      labels: [
        {
          name: '客厅',
          id: 42,
          ifChoose: false
        },
        {
          name: '餐厅',
          id: 43,
          ifChoose: false
        },
        {
          name: '厨房',
          id: 44,
          ifChoose: false
        },
        {
          name: '卧室',
          id: 45,
          ifChoose: false
        },
        {
          name: '儿童房',
          id: 46,
          ifChoose: false
        },
        {
          name: '书房',
          id: 47,
          ifChoose: false
        },
        {
          name: '衣帽间',
          id: 48,
          ifChoose: false
        },
        {
          name: '卫生间',
          id: 49,
          ifChoose: false
        },
        {
          name: '酒窖',
          id: 50,
          ifChoose: false
        },
        {
          name: '玄关',
          id: 51,
          ifChoose: false
        },
        {
          name: '楼梯',
          id: 52,
          ifChoose: false
        },
        {
          name: '阳台',
          id: 53,
          ifChoose: false
        }
      ]
    }
  ];

  //真正处理的
  arrs = this.defaultArrs;

  //页面初始化，用于首次进入/更新
  initPage = async currentNum => {
    try {
      const res = await fetchShelve();
      const data = res.data;
      console.log(data.length);
      if (data.length == 0) {
        Taro.navigateBack();
        return;
      }
      if (data[data.length - 1].img_id == currentNum) {
        return false;
      }
      let num = data[data.length - 1].img_id;
      let url = data[data.length - 1].img_url;

      this.setState({
        imgURL: url,
        imgID: num
      });
    } catch (e) {
      Taro.showToast({
        icon: 'none',
        title: e.message
      });
    }
    return true;
  };

  //更改处理器
  changeDisplay = (state, action) => {
    if (action.ifRefresh == true) {
      return this.defaultArrs;
    }
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

  componentWillMount() {
    const token = Taro.getStorageSync('token');
    console.log(token);

    if (token == '') {
    } else {
      showLoading();
      this.arrs = this.defaultArrs;
      this.initPage(-1);
      hideLoading();
    }
  }

  render() {
    //useReducer管理整个标签面板
    //arrs 在此转成 arrState 使用
    const [arrState, dispatch] = useReducer(this.changeDisplay, this.arrs);

    return (
      <View className='doing'>
        <Headimg url={this.state.imgURL} />
        <Headstand />

        <OperateBar
          toRefresh={dispatch}
          toInit={this.initPage}
          imgID={this.state.imgID}
          info={arrState}
        />

        {arrState.map(ele => {
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
        {/*底部占位，让标签页拉满*/}
        <View className='takeplace' />
      </View>
    );
  }
}
