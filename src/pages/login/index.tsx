import Taro, {Component} from '@tarojs/taro'
import {View, Text, Input, Button} from '@tarojs/components'
import {LoginProp, LoginState} from "../../interface/login";
import './index.scss'

class Login extends Component<LoginProp, LoginState> {
  constructor(props: LoginProp) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };

    this.onUserChange = this.onUserChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
  }

  onUserChange(e): void {
    console.log(e.target.value)
  }

  onPasswordChange(): void {

  }

  onClickRegister(): void {

  }

  onClickLogin(): void {

  }

  render() {
    return (
      <View className='container'>
        <View>
          {/*标题*/}
          <View className='title'>
            <Text className='titleText'>登陆</Text>
          </View>

          {/*登陆框*/}
          <View className='signIn'>
            <View className='User'>
              <Input
                value={this.state.username}
                placeholder='用户名'
                onInput={this.onUserChange}
              >
              </Input>
            </View>
            <View className='Pwd'>
              <Input
                value={this.state.password}
                placeholder='密码'
                password={true}
                onInput={this.onPasswordChange}
              >
              </Input>
            </View>
          </View>


          {/*登陆按钮*/}
          <Button onClick={this.onClickLogin}>登陆</Button>


          {/*注册入口*/}
          <View onClick={this.onClickRegister}>
            <Text>注册</Text>
          </View>


        </View>
      </View>
    )
  }
}

export default Login;
