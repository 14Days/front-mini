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
      step: 1,
      sendText:'下一步',
      allowSend: false,  //直接控制‘下一步’按钮状态
      isRepeat: false,  //是否正在重发读秒
      frontTip: '',  //发送提示
    };

    this.confirm = this.confirm.bind(this);
  }

  config = {};


  confirm():void {
    //检查是否填写验证码
    if(this.state.code === ''){

    }

  }
  //检查手机号, 改变下一步按钮的状态
  checkPhoneNumber(): boolean {
    //检查手机号
    const reg = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/
    const ifphoneCorrect = reg.test(this.state.phoneNumber)
    if (ifphoneCorrect === true && this.state.isRepeat === false) {  //确保此时不在读秒状态，否则这时更改框中号码会出现读秒状态按钮却激活的现象
      this.setState({
        allowSend: true
      })
    } else {
      this.setState({
        allowSend: false
      })
    }
    return false;
  }
  
  //用于重发读秒
  loopCount(count:number): void {
    this.setState({
      sendText: count + '秒后重发'
    });

    count -= 1
    if (count > 0) {
      setTimeout(() => {this.loopCount(count)}, 1000)
    } else {
      setTimeout(() => {this.setState({
        sendText: '重新发送',
        isRepeat: false,
      },
      () => {this.checkPhoneNumber()}},   //读秒最后额外检查一次电话号码，来决定是否真的激活按钮
      1000)
      
    }
  }

  //点击下一步/重发按钮，请求发送短信并追加显示下一段表单
  checkCode(): void {

    //界面逻辑
    this.setState({
      frontTip: '已发送验证码到' + this.state.phoneNumber
    });

    this.setState({
      allowSend: false,  //失活按钮
      isRepeat: true,  //进入读秒状态
    });
    this.loopCount(10);  //重发读秒
    
    //API

    this.setState({
      step: 2
    })
  }


  render() {

    //只显示手机号码输入框
    const StepOne: JSX.Element = (
      <View>
        <View className='title'>
          <Text className='titleText'>注册</Text>
        </View>
        <View className='phoneBox'>
          <Input
            value={this.state.phoneNumber}
            placeholder='手机号码'
            onInput={(e) => {
              this.setState({
                phoneNumber: e.target.value
              },
              () => this.checkPhoneNumber())
            }}
          >
          </Input>
        </View>
      </View>
    );
    
    //验证码输入框在这一段，与其余信息一并提交
    const StepTwo: JSX.Element = (
      <View>
        <View className='userInfo'>
          <Input
            type='number'
            placeholder='验证码'
            onInput={(e) => {
              this.setState({
                code: e.target.value
              })
            }}
          >
          </Input>
        </View>
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
        <Button
          onClick={this.confirm}
        >确认</Button>
        <View>
          <Text className='tipWord'></Text>
        </View>
      </View>
    );

    const nextStepBtn = (
      <View>
        <Button
          className='sendButton'
          onClick={this.checkCode}
          disabled={!this.state.allowSend}
        >{this.state.sendText}</Button>
        {/*发送提示*/}
        <View className='sendTip'>
          <Text className='sendWord'>{this.state.frontTip}</Text>
        </View>
      </View>
    );

    return (
      <View className='container'>
        {StepOne}
        {/*下一步/重发按钮始终出现*/}
        {nextStepBtn}
        {this.state.step === 2 ? StepTwo : null}
      </View>
    );
  }

}

export default Register;
