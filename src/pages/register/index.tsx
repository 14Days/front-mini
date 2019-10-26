import Taro, {Component} from '@tarojs/taro';
import {View, Text, Input, Button} from '@tarojs/components';
import {getCodeURL, registerURL, loginURL} from "../../utils/url";
import request from '../../utils/request';

import './index.scss';

interface IRegisterState {
  username: string,  //用户名
  password: string,  //密码
  phoneNumber: string,  //手机号
  firstPassword: string,  //密码
  secondPassword: string, //确认密码
  step: number,  //注册步骤
  code: string,  //验证码
  sendText: string  //按钮文字
  allowSend: boolean,  //直接控制‘下一步’按钮状态, 输入手机号格式正确时
  isRepeat: boolean,  //是否正在重发读秒
  frontTip: string, //文字提示

}

class Register extends Component<{}, IRegisterState> {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '',
      username: '',
      password: '',
      firstPassword: '',
      secondPassword: '',
      code: '',
      step: 1,
      sendText: '下一步',
      allowSend: false,  //直接控制‘下一步’按钮状态, 输入手机号格式正确时
      isRepeat: false,  //是否正在重发读秒
      frontTip: '',  //发送提示
    };
  }


  //检查手机号, 改变下一步按钮的状态
  checkPhoneNumber(): boolean {
    //检查手机号
    let ifphoneCorrect = false;
    if (this.state.phoneNumber.length === 11) {
      const reg = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/;
      ifphoneCorrect = reg.test(this.state.phoneNumber)
    }
    if (ifphoneCorrect && !this.state.isRepeat) {  //确保此时不在读秒状态，否则这时更改框中号码会出现读秒状态按钮却激活的现象
      this.setState({
        allowSend: true
      });
      return true;
    } else {
      this.setState({
        allowSend: false
      });
      return false;
    }

  }

  //用于重发读秒
  loopCount(count: number): void {
    this.setState({
      sendText: count + '秒后重发'
    });

    count -= 1;
    if (count > 0) {
      setTimeout(() => {
        this.loopCount(count)
      }, 1000)
    } else {
      setTimeout(
        () => {
          this.setState({
              sendText: '重新发送',
              isRepeat: false,
            },
            () => {
              this.checkPhoneNumber()
            })
        },   //读秒最后额外检查一次电话号码，来决定是否真的激活按钮
        1000);

    }
  }

  //点击下一步/重发按钮，请求发送短信并追加显示下一段表单
  sendCode(): void {
    //界面逻辑
    this.setState({
      frontTip: '已发送验证码到' + this.state.phoneNumber
    });

    this.setState({
      allowSend: false,  //失活按钮
      isRepeat: true,  //进入读秒状态
    });
    // const res = request.get();
    this.loopCount(60);  //重发读秒


    //API
    Taro.request({
      url: getCodeURL,
      data: {
        phone: this.state.phoneNumber
      }
    }).then(res => {
      console.log(res)
    });

    this.setState({
      step: 2
    })
  }

  checkALL(): boolean {
    Taro.showLoading({
      title: '请稍后..',
      mask: true,
    });
    if (!this.checkPhoneNumber) {
      this.setState({
        frontTip: '手机号码格式不正确'
      });
      Taro.hideLoading();
      return false;
    }
    if (this.state.code.length !== 4) {
      this.setState({
        frontTip: '验证码格式不正确'
      });
      Taro.hideLoading();
      return false;
    }
    if (this.state.username === '') {
      this.setState({
        frontTip: '用户名不能为空'
      });
      Taro.hideLoading();
      return false;
    }
    if (this.state.firstPassword === '') {
      this.setState({
        frontTip: '密码不能为空'
      });
      Taro.hideLoading();
      return false;
    }
    if (this.state.firstPassword !== this.state.secondPassword) {
      this.setState({
        frontTip: '两次密码不相同'
      });
      Taro.hideLoading();
      return false;
    }

    Taro.hideLoading();
    return true
  }

  // 信息格式✅, 提交至服务器
  commitInfo(): void {
    if (this.checkALL()) {
      const {phoneNumber: phone, password, code, username: name} = this.state;
      const regData = {phone, password, code, name};
      request.get(registerURL, regData)
        .then(() => {
            //注册成功, 直接登录
            const loginData = {name, password};
            request.post(loginURL, loginData)
              .then(() => {
                // 登陆成功👌, 进入 Tab 页
                Taro.switchTab({url:"../index/index"})
              })
          }
        )
    }
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
            onInput={(e: any) => {
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
            onInput={(e: any) => {
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
            onInput={(e: any) => {
              this.setState({
                username: e.target.value
              })
            }}>
          </Input>
          <Input
            value={this.state.firstPassword}
            placeholder='密码'
            password={true}
            onInput={(e: any) => {
              this.setState({
                firstPassword: e.target.value
              })
            }}
          >
          </Input>
          <Input
            value={this.state.secondPassword}
            placeholder='再次输入密码'
            password={true}
            onInput={(e: any) => {
              this.setState({
                secondPassword: e.target.value
              })
            }}
          >
          </Input>
        </View>
        <Button
          className='comfirmButton'
          onClick={this.commitInfo}
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
          onClick={this.sendCode}
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
