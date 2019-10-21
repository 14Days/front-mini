import Taro, { Component, Config } from '@tarojs/taro';
import { View, Text, Input, Button } from '@tarojs/components';
import { set as setGlobalData } from '../../common/globalData/global_data';
import './index.scss';

interface LoginState {
  username: string;
  password: string;
  tip: string;
}

class Login extends Component<null, LoginState> {
  config: Config = {
    backgroundColor: '#eeeeee',
    backgroundTextStyle: 'dark',
    navigationBarTitleText: '家居设计小程序'
  };

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      tip: '',
    };
  }

  onClickRegister(): void {
    //API
    Taro.navigateTo({
      url:'../register/index'
    })
    console.log('register');
  }

  onClickLogin(): void {
    Taro.showLoading({
      title: '请稍后..',
      mask: true,
    })
    if (this.state.username == '') {
      this.setState({
        tip: '用户名不能为空'
      })
      Taro.hideLoading()
      return
    }
    if (this.state.password == '') {
      this.setState({
        tip: '密码不能为空'
      })
      Taro.hideLoading()
      return
    }

    //API
    Taro.request({
      url: 'https://wghtstudio.cn/mini/user/authorization',
      method: 'POST',
      data: {
        name: this.state.username,
        password: this.state.password,
      }
    }).then(res => {
      console.log(res)
      if (res.data.status != 'success') {
        this.setState({
          tip: res.data.err_msg
        })
        Taro.hideLoading()
      } else {
        console.log('set token: ' + res.data.data)
        setGlobalData('token', res.data.data)
        setGlobalData('username', this.state.username)
        Taro.hideLoading()
        Taro.switchTab({
          url: '../index/index'
        })
      }
    })
    console.log('login');
  }

  render(): JSX.Element {
    return (
      <View className='container'>
        {/*标题*/}
        <View className='title'>
          <Text className='titleText'>用户登陆</Text>
        </View>

        {/*登陆框*/}
        <View className='InputAttachedLines'>
          <Input
            className='User'
            value={this.state.username}
            placeholder='请输入用户名'
            onInput={(e: any) => {
              this.setState({
                username: e.target.value
              });
            }}
          ></Input>
          <Input
            className='Pwd'
            value={this.state.password}
            placeholder='请输入密码'
            password={true}
            onInput={(e: any) => {
              this.setState({
                password: e.target.value
              });
            }}
          ></Input>
        </View>

        {/*登陆按钮*/}
        <Button onClick={this.onClickLogin}>登陆</Button>

        {/*注册入口*/}
        <View className='register' onClick={this.onClickRegister}>
          <Text>>> 还没注册? 点这里 >></Text>
        </View>

        {/*提示*/}
        <View className='tip'>
          <Text className='tipWord'>{this.state.tip}</Text>
        </View>
      </View>
    );
  }
}

export default Login;
