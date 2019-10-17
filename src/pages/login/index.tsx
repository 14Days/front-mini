import Taro, {useState} from '@tarojs/taro'
import {View, Text, Input, Button} from '@tarojs/components'
import './index.scss'
interface LoginState {
  username: string,
  password: string
}
function Login(){

  function onClickRegister(): void {
    //API
    console.log("register")
  }

  function onClickLogin(): void {
    //API
    console.log("login")
  }

  const initState : LoginState = {
    username: '',
    password: ''
  };

  const [state, setState] = useState(initState);


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
              onInput={(e) => setState({
                username: e.target.value,
                password: state.password
              })}
            >
            </Input>
          </View>
          <View className='Pwd'>
            <Input
              value={this.state.password}
              placeholder='密码'
              password={true}
              onInput={(e) => setState({
                username: state.username,
                password: e.target.value
              })}
            >
            </Input>
          </View>
        </View>


        {/*登陆按钮*/}
        <Button onClick={onClickLogin}>登陆</Button>


        {/*注册入口*/}
        <View onClick={onClickRegister}>
          <Text>注册</Text>
        </View>


      </View>
    </View>
  );
}

export default Login;
