import Taro from '@tarojs/taro';
import {View, Text, Input, Button} from '@tarojs/components';
import {CommonEvent} from '@tarojs/components/types/common';
import {useSelector, useDispatch} from '@tarojs/redux';
import {IFunctionConfig} from '../../types/fcomponent';

import style from './index.module.scss';

let Login = (() => {
  const {username, password} = useSelector((state: any) => state.login);
  const dispatch = useDispatch();
  console.log(Taro.getEnv());
  return (
    <View className={style.container}>
      {/*标题*/}
      <View className={style.title}>
        <Text>用户登陆</Text>
      </View>

      {/*登陆框*/}
      <View className={style.InputAttachedLines}>
        <Input
          value={username}
          placeholder='请输入用户名'
          onInput={(e: CommonEvent) => {
            dispatch({
              type: 'login/save',
              payload: {username: e.detail.value}
            })}
          }
        />
        <Input
          value={password}
          placeholder='请输入密码'
          password={true}
          onInput={(e: CommonEvent) => {
            dispatch({
              type: 'login/save',
              payload: {password: e.detail.value}
            })}
          }
        />
      </View>

      {/*登陆按钮*/}
      <Button
        onClick={() => dispatch({type: 'login/handlerLogin'})}
        className={style.submit}
      >
        登陆
      </Button>

      {/*注册入口*/}
      <View
        className={style.register}
        onClick={() => Taro.navigateTo({url: '../register/index'})}
      >
        <Text>>> 还没注册? 点这里 >></Text>
      </View>
    </View>
  );
}) as IFunctionConfig;

Login.config = {
  backgroundColor: '#eeeeee',
  backgroundTextStyle: 'dark',
  navigationBarTitleText: '家居设计'
};

export default Login;
