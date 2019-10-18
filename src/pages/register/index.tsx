import Taro, {Component} from '@tarojs/taro';
import {View, Text, Input, Button} from '@tarojs/components';
import {RegisterProp, RegisterState} from '../../interface/register';
import './index.scss';


class Register extends Component<RegisterProp, RegisterState> {
  constructor(props: RegisterProp) {
    super(props);

    this.state = {
      phoneNumber: '',
      auth: 0,
      username: '',
      firstPassword: '',
      secondPassword: '',
      password: '',
      code: '',
      step: 1
    };

    this.onUseeChange = this.onUseeChange.bind(this);
  }

  config = {};

  onUseeChange(e: Event): void {
    console.log(e);
  }

  //检查手机号, 改变下一步按钮的状态
  checkPhoneNumber(): boolean {
    return false;

  }

  //检查验证码
  checkCode(): void {
    //API

    //发送验证码

    //验证验证码是否匹配

    //匹配
    this.setState({
      step: 2
    })

    //不匹配,重新输入
  }


  render() {
    const StepOne: JSX.Element = (
      <View>
        <View className='title'>
          <Text className='titleText'>请输入注册手机号</Text>
        </View>
        <View className='phoneBox'>
          <Input
            value={this.state.phoneNumber}
            placeholder='手机号码'
            onInput={(e) => {
              this.setState({
                phoneNumber: e.target.value
              })
            }}
            disabled={this.state.step !== 1}
          >
          </Input>
          <Input
            type='number'
            placeholder='验证码'
            onInput={(e) => {
              this.setState({
                code: e.target.value
              })
            }}
            disabled={this.state.step !== 1}
          >
          </Input>
        </View>

      </View>
    );

    const StepTwo: JSX.Element = (
      <View>
        <View className='userInfo'>
            <Input
              value={this.state.username}
              placeholder='用户名'
              onInput={() => {
              }}>
            </Input>
            <Input
              value={this.state.firstPassword}
              placeholder='密码'
              password={true}
              onInput={(e) => {
                this.setState({
                  firstPassword: e.target.value
                })
              }}
            ></Input>
            <Input
              value={this.state.secondPassword}
              placeholder='再次输入密码'
              password={true}
              onInput={(e) => {
                this.setState({
                  secondPassword: e.target.value
                })
              }}
            ></Input>
        </View>
        <Button>确认</Button>
        <View>
          <Text className='tipWord'></Text>
        </View>
      </View>
    );

    const nextStepBtn = (
      <Button
        className='sendButton'
        onClick={this.checkCode}
      >下一步</Button>
    );
    return (
      <View className='container'>
        {StepOne}
        {this.state.step === 1 ? nextStepBtn : null}
        {this.state.step === 2 ? StepTwo : null}
      </View>
    );
  }

}

export default Register;
