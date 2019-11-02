import Taro, {Component, Config} from '@tarojs/taro';
import {View, Button, Image, Text} from '@tarojs/components';
import {get as getGlobalData} from '../../common/globalData/global_data';
import building from '../../static/icon/building.svg';

import style from './index.module.scss';

interface IState {
  id: string;
}

export default class Info extends Component<{}, IState> {
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
    Taro.setStorageSync('token', '');
    Taro.setStorageSync('username', '');
    Taro.reLaunch({
      url: '../login/index'
    })
  }


  render() {
    return (
      <View className={style.container}>
        {/* 其他内容,建设中... */}
        <Text>其他内容,建设中...</Text>
        <Image
          src={building}
        />
        <Button className={style.exitBtn} onClick={() => this.exitLoginState()}>退出登录</Button>
      </View>
    );
  }
}
