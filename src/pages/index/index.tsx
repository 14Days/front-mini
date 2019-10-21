import Taro, { Component, Config } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import Capsule from '../../components/capsule';
import Headswiper from './components/head_swiper';
import Statistics from './components/statistics';
import Bulletin from './components/bulletin';
import Shelvebar from './components/shelveBar';

import './index.scss';

//全局变量
import { get as getGlobalData } from '../../common/globalData/global_data';

export default class Index extends Component {
  config: Config = {
    navigationStyle: 'custom'
  };
  componentWillMount() {
    const token = getGlobalData('token')
    if (token == '') {
      Taro.redirectTo({
        url: '../login/index'
      })
    }
  }
  //样例公告
  bulletinWord = '每人每天额定700张图片，请确定是否满足额度';

  render() {
    return (
      <View className='index'>
        <Headswiper />
        <Capsule number={0} displayName={true} />
        <View className='welcome'>
          <Text>欢迎您 亲爱的设计师</Text>
        </View>
        <Statistics week={439} day={19} />
        <Bulletin content={this.bulletinWord} />
        <Shelvebar />
      </View>
    );
  }
}
