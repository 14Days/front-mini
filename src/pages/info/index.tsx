import Taro, {Component, Config} from '@tarojs/taro';
import {View, Button, Image, Text} from '@tarojs/components';
import building from '../../static/icon/building.svg';

import style from './index.module.scss';

export default class Info extends Component {
  config: Config = {
    navigationBarTitleText: '关于',
  };

  exitLoginState() {
    Taro.setStorageSync('token', '');
    Taro.setStorageSync('username', '');
    Taro.reLaunch({
      url: '../login/index',
    });
  }

  render() {
    return (
      <View className={style.container}>
        {/* 其他内容,建设中... */}
        <Text>其他内容,建设中...</Text>
        <Image src={building} />
        <Button className={style.exitBtn} onClick={() => this.exitLoginState()}>
          退出登录
        </Button>
      </View>
    );
  }
}
