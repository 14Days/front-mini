import Taro, { Component, Config } from '@tarojs/taro';
import { View, Text, Input, Button } from '@tarojs/components';
import './index.scss';

interface LoginState {
  username: string;
  password: string;
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
      password: ''
    };
  }

  onClickRegister(): void {
    //API
    console.log('register');
  }

  onClickLogin(): void {
    //API
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
      </View>
    );
  }
}

export default Login;
