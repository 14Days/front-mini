import Taro, { Component, Config } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { get as getGlobalData } from '../../common/globalData/global_data';

import style from './index.module.scss';

interface IState {
  id: string;
}

export default class Info extends Component<null, IState> {
  config: Config = {
    navigationBarTitleText: '关于'
  };

  constructor(props) {
    super(props);
    this.state = {
      id: ''
    };
  }

  componentDidMount() {
    this.setState({
      id: getGlobalData('id')
    });
  }

  exitLoginState() {
    Taro.setStorageSync('token','')
    Taro.setStorageSync('username','')
    Taro.reLaunch({
      url: '../login/index'
    })
  }


  render() {
    const { id } = this.state;
    return (
      <View>
        <Text className={style.textID} onClick={() => this.exitLoginState()}>退出登录</Text>
      </View>
    );
  }
}
