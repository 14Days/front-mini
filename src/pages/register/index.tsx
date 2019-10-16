import Taro, { Component } from '@tarojs/taro';
import { View, Text, Input, Button } from '@tarojs/components';
import { RegisterProp, RegisterState } from '../../interface/register';
import './index.scss';

class Register extends Component<RegisterProp, RegisterState> {
  constructor(props: RegisterProp) {
    super(props);

    this.state = {
      phonenumber: '',
      auth: 0,
      username: '',
      firstpassword: '',
      secondpassword:'',
      password: '',
    };

    this.onUseeChange = this.onUseeChange.bind(this);
  }
  config = {};

  onUseeChange(e: Event): void {
    console.log(e);
  }
  render() {
    return (
      <View className='container'>
        <View className='title'>
          <Text className='titleText'>注册</Text>
        </View>
        <View className='linebetween' />
        <View className='phonebox'>
          <Input
            value={this.state.phonenumber}
            placeholder='手机号码'
            onInput={() => {}}>
          </Input>
        </View>
        <Button className='sendButton' onClick={() => {}} disabled>下一步</Button>
        
        <View className='moreinfo'>
          <View className='authbox'>
            <Input
              type='number'
              placeholder='验证码'
              onInput={() => {}}>
            </Input>
            <Button className='resendButton'>重发</Button>
          </View>
          <View className='username'>
            <Input
              value={this.state.username}
              placeholder='用户名'
              onInput={() => {}}>
            </Input>
          </View>
          <View className = 'firstPwd'>
            <Input
              value={this.state.firstpassword}
              placeholder='密码'
              password={true}
            ></Input>
          </View>
          <View className = 'firstPwd'>
            <Input
              value={this.state.secondpassword}
              placeholder='再次输入密码'
              password={true}
            ></Input>
          </View>
          <Button>确认</Button>
        </View>

        <View>
          <Text className='tipWord'></Text>
        </View>
      </View>
    );
  }
}

export default Register;
