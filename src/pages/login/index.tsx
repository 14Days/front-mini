import Taro, { Component } from '@tarojs/taro'
import { View, Text, Input } from '@tarojs/components'
import {LoginProp, LoginState} from "../../interface/login";
import './index.scss'

class Login extends Component<LoginProp, LoginState> {
  constructor(props:LoginProp){
    super(props);

    this.state = {
      username: '',
      password: ''
    }

    this.onUseeChange = this.onUseeChange.bind(this);
  }
  config = {

  };

  onUseeChange(e:Event):void{
    console.log(e)
  }
  render (){
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
                onInput={this.onUseeChange}
              >
              </Input>
            </View>
            <View className='Pwd'>
              <Input
                value={this.state.password}
                placeholder='密码'
                password={true}
              >
              </Input>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default Login;
