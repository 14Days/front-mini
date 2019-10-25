import Taro, {Component} from '@tarojs/taro';
import {View, Text, Input, Button} from '@tarojs/components';
import { set as setGlobalData } from '../../common/globalData/global_data';
import './index.scss';

interface RegisterState {
  phoneNumber: string,
  username: string,
  firstPassword: string,
  secondPassword: string,
  password: string,
  code: string,
  step: number,
  sendText: string,
  allowSend: boolean,  //直接控制‘下一步’按钮状态
  isRepeat: boolean,  //是否正在重发读秒
  frontTip: string,  //发送提示
}

class Register extends Component<null, RegisterState> {
  constructor(props) {
    super(props);

    this.state = {
      phoneNumber: '',
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

    this.onUseeChange = this.onUseeChange.bind(this);
  }

  config = {};

  onUseeChange(e: Event): void {
    console.log(e);
  }

  //检查手机号, 改变下一步按钮的状态
  checkPhoneNumber(): boolean {
    //检查手机号
    let ifphoneCorrect = false
    if (this.state.phoneNumber.length === 11) {
      const reg = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/
      ifphoneCorrect = reg.test(this.state.phoneNumber)
    }
    if (ifphoneCorrect === true && this.state.isRepeat === false) {  //确保此时不在读秒状态，否则这时更改框中号码会出现读秒状态按钮却激活的现象
      this.setState({
        allowSend: true
      })
      return true;
    } else {
      this.setState({
        allowSend: false
      })
      return false;
    }
    
  }
  
  //用于重发读秒
  loopCount(count:number): void {
    this.setState({
      sendText: count + '秒后重发'
    })

    count -= 1
    if (count > 0) {
      setTimeout(() => {this.loopCount(count)}, 1000)
    } else {
      setTimeout(
        () => {this.setState({
        sendText: '重新发送',
        isRepeat: false,
        },
        () => {this.checkPhoneNumber()})},   //读秒最后额外检查一次电话号码，来决定是否真的激活按钮
      1000);
      
    }
  }

  //点击下一步/重发按钮，请求发送短信并追加显示下一段表单
  checkCode(): void {

    //界面逻辑
    this.setState({
      frontTip: '已发送验证码到' + this.state.phoneNumber
    })

    this.setState({
      allowSend: false,  //失活按钮
      isRepeat: true,  //进入读秒状态
    })
    this.loopCount(10)  //重发读秒
    
    //API
    Taro.request({
      url: 'https://wghtstudio.cn/mini/user/code',
      data: {
        phone: this.state.phoneNumber
      }
    }).then(res => {
      console.log(res)
    })

    this.setState({
      step: 2
    })
  }

  checkALL(): void {
    Taro.showLoading({
      title: '请稍后..',
      mask: true,
    })
    if (!this.checkPhoneNumber) {
      this.setState({
        frontTip: '手机号码格式不正确'
      })
      Taro.hideLoading()
      return
    }
    if (this.state.code.length != 4) {
      this.setState({
        frontTip: '验证码格式不正确'
      })
      Taro.hideLoading()
      return
    }
    if (this.state.username == '') {
      this.setState({
        frontTip: '用户名不能为空'
      })
      Taro.hideLoading()
      return
    }
    if (this.state.firstPassword == '') {
      this.setState({
        frontTip: '密码不能为空'
      })
      Taro.hideLoading()
      return
    }
    if (this.state.firstPassword != this.state.secondPassword) {
      this.setState({
        frontTip: '两次密码不相同'
      })
      Taro.hideLoading()
      return
    }
    console.log('all correct')
    Taro.request({
      url: 'https://wghtstudio.cn/mini/user/account',
      method: 'POST',
      data: {
        phone: this.state.phoneNumber,
        code: this.state.code,
        password: this.state.firstPassword,
        name: this.state.username
      }
    }).then(res => {
      console.log(res)
      if (res.data.status == 'success') {  //注册成功

        //马上尝试登录
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
              frontTip: res.data.err_msg
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

        Taro.hideLoading()
      } else {
        this.setState({
          frontTip: '验证码错误'
        })
        Taro.hideLoading()
      }
    })
    Taro.hideLoading()

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
            ></Input>
            <Input
              value={this.state.secondPassword}
              placeholder='再次输入密码'
              password={true}
              onInput={(e: any) => {
                this.setState({
                  secondPassword: e.target.value
                })
              }}
            ></Input>
        </View>
        <Button
          className='comfirmButton'
          onClick={this.checkALL}
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
