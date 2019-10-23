import Taro, { Component, Config } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import Capsule from '../../components/capsule';
import Headswiper from './components/head_swiper';
import Statistics from './components/statistics';
import Bulletin from './components/bulletin';
import Shelvebar from './components/shelveBar';
//全局变量
import { get as getGlobalData } from '../../common/globalData/global_data';
import './index.scss';

interface IState {
  bulletinWord: string;
  dayNumber: number;
  weekNumber: number;
  cyclePhoto: Array<string>;
}

export default class Index extends Component<{}, IState> {
  config: Config = {
    navigationStyle: 'custom'
  };

  constructor(props) {
    super(props);
    this.state = {
      bulletinWord: '',
      dayNumber: 0,
      weekNumber: 0,
      cyclePhoto: []
    };
  }

  componentWillMount() {
    const token = Taro.getStorageSync('token')
    console.log('indextoken: ' + token);
    
    if (token == '') {
      //未登录
      Taro.redirectTo({
        url: '../login/index'
      });
    } else {
      //已登录

      //公告
      Taro.request({
        url: 'https://wghtstudio.cn/mini/notice',
        method: 'GET',
        header: {
          token: token
        }
      }).then(res => {
        console.log(res);
        if (res.data.status == 'success') {
          this.setState({
            bulletinWord: res.data.data
          });
        } else {
          Taro.showToast({
            title: '获取公告错误',
            icon: 'warning'
          });
        }
      });

      //统计数据
      Taro.request({
        url: 'https://wghtstudio.cn/mini/record/count',
        method: 'GET',
        header: {
          token: token
        }
      }).then(res => {
        console.log(res);
        if (res.data.status == 'success') {
          this.setState({
            dayNumber: res.data.day,
            weekNumber: res.data.week
          });
        } else {
          Taro.showToast({
            title: '获取统计错误',
            icon: 'warning'
          });
        }
      });

      //轮播图
      Taro.request({
        url: 'https://wghtstudio.cn/mini/img/cycle',
        method: 'GET',
        header: {
          token: token
        }
      }).then(res => {
        console.log(res);
        if (res.data.status == 'success') {
          this.setState({
            cyclePhoto: res.data.data
          });
        } else {
          Taro.showToast({
            title: '获取轮播图错误',
            icon: 'warning'
          });
        }
      });
    }
  }
  //样例公告
  // bulletinWord = '每人每天额定700张图片，请确定是否满足额度';

  render() {
    return (
      <View className='index'>
        <Headswiper pics={this.state.cyclePhoto} />
        <Capsule number={0} displayName={true} />
        <View className='welcome'>
          <Text>欢迎您 亲爱的设计师</Text>
        </View>
        <Statistics week={this.state.weekNumber} day={this.state.dayNumber} />
        <Bulletin content={this.state.bulletinWord} />
        <Shelvebar />
      </View>
    );
  }
}
