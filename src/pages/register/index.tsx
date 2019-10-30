import Taro, {Component} from '@tarojs/taro';
import {View, Text, Input, Button} from '@tarojs/components';

import './index.scss';
import {connect} from "@tarojs/redux";

interface IRegisterState {
  username: string,  //用户名
  password: string,  //密码
  phoneNumber: string,  //手机号
  firstPassword: string,  //密码
  secondPassword: string, //确认密码
  step: number,  //注册步骤
  code: string,  //验证码
  sendText: string  //按钮文字
  unableSend: boolean,  //直接控制‘下一步’按钮状态, 输入手机号格式正确时
  isRepeat: boolean,  //是否正在重发读秒
  frontTip: string, //文字提示
}

interface IRegisterProps {
  username: string,  //用户名
  password: string,  //密码
  phoneNumber: string,  //手机号
  firstPassword: string,  //密码
  secondPassword: string, //确认密码
  step: number,  //注册步骤
  code: string,  //验证码
  sendText: string  //按钮文字
  unableSend: boolean,  //直接控制‘下一步’按钮状态, 输入手机号格式正确时
  isRepeat: boolean,  //是否正在重发读秒
  frontTip: string, //文字提示
  dispatch: Function
}

class Register extends Component<IRegisterProps, IRegisterState> {
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    this.initInfo();
  }

  initInfo(): void {
    this.props.dispatch({
      type: 'register/cleanCode'
    })
  }

  // 信息格式✅, 提交至服务器
  commitInfo(): void {
    this.props.dispatch({
      type: 'register/handleConfirm'
    })
  }
  confirm(): void {
    new Promise((resolve,reject) => {
      this.props.dispatch({
        type: 'register/checkShowTip',
        payload: {
          username:this.props.username,
          firstPassword:this.props.firstPassword,
          secondPassword:this.props.secondPassword,
          code:this.props.code,
          phoneNumber:this.props.phoneNumber
        }
      });
      resolve();
    }).then(() => {
      if(this.props.frontTip === '')
        this.commitInfo();
    })
  }

  render() {
    const {
      phoneNumber,
      username,
      firstPassword,
      secondPassword,
      code,
      step,
      sendText,
      unableSend,
      isRepeat,
      frontTip,
      dispatch
    } = this.props;
    //只显示手机号码输入框
    const StepOne: JSX.Element = (
      <View>
        <View className='title'>
          <Text className='titleText'>注册</Text>
        </View>
        <View className='phoneBox'>
          <Input
            value={phoneNumber}
            placeholder='手机号码'
            onInput={(e: any) => {
              dispatch({
                type: 'register/changePhoneNumber',
                payload: {
                  phoneNumber: e.detail.value,
                  isRepeat: isRepeat
                }
              })
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
            value={code}
            type='number'
            placeholder='验证码'
            onInput={(e: any) => {
              dispatch({
                type: 'register/save',
                payload: {code: e.detail.value}
              })
            }}
          >
          </Input>
        </View>
        <View className='userInfo'>
          <Input
            value={username}
            placeholder='用户名'
            onInput={(e: any) => {
              dispatch({
                type: 'register/save',
                payload: {username: e.detail.value}
              })
            }}
          >
          </Input>
          <Input
            value={firstPassword}
            placeholder='密码'
            password={true}
            onInput={(e: any) => {
              dispatch({
                type: 'register/save',
                payload: {firstPassword: e.detail.value}
              })
            }}
          >
          </Input>
          <Input
            value={secondPassword}
            placeholder='再次输入密码'
            password={true}
            onInput={(e: any) => {
              dispatch({
                type: 'register/save',
                payload: {secondPassword: e.detail.value}
              })
            }}
          >
          </Input>
        </View>
        <Button
          className='comfirmButton'
          onClick={this.confirm}
        >确认</Button>
        <View>
          <Text className='tipWord'>
          </Text>
        </View>
      </View>
    );

    const nextStepBtn = (
      <View>
        <Button
          className='sendButton'
          onClick={() => {
            dispatch({
              type: 'register/handleRequestCode'
            });
          }}
          disabled={unableSend}
        >{sendText}</Button>

        {/*发送提示*/}
        <View className='sendTip'>
          <Text className='sendWord'>{frontTip}</Text>
        </View>
      </View>
    );

    return (
      <View className='container'>
        {StepOne}
        {/*下一步/重发按钮始终出现*/}
        {nextStepBtn}
        {step === 2 ? StepTwo : undefined}
      </View>
    );
  }

}

export default connect(state => state.register)(Register);
