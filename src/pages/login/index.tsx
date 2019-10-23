import Taro from '@tarojs/taro';
import { View, Text, Input, Button } from '@tarojs/components';
import { CommonEvent } from '@tarojs/components/types/common';
import { useLoading } from '../../utils/loading';
import { useLoginState } from './model';
import { fetchLogin } from '../../services/login';
import { IFunctionConfig } from '../../types/fcomponent';

import './index.scss';

let Login = (() => {
  const { state, dispatch } = useLoginState();
  const { username, password } = state;
  const { changeLoading } = useLoading();

  const submit = async () => {
    if (username === '' || password === '') {
      Taro.showToast({
        icon: 'none',
        title: '请检查必填项'
      });
      return;
    }
    changeLoading(true);
    try {
      const res = await fetchLogin(username, password);
      Taro.setStorageSync('token', res.data);
      changeLoading(false);
      Taro.switchTab({
        url: '/pages/index/index'
      });
    } catch (e) {
      changeLoading(false);
      Taro.showToast({
        icon: 'none',
        title: e.message
      });
    }
  };

  return (
    <View className='container'>
      {/*标题*/}
      <View className='title'>
        <Text className='titleText'>用户登陆</Text>
      </View>

      {/*登陆框*/}
      <View className='InputAttachedLines'>
        <Input
          className='User'
          value={username}
          placeholder='请输入用户名'
          onInput={(e: CommonEvent) =>
            dispatch({
              type: 'handlerUsername',
              payload: e.detail.value
            })
          }
        />
        <Input
          className='Pwd'
          value={password}
          placeholder='请输入密码'
          password={true}
          onInput={(e: CommonEvent) =>
            dispatch({
              type: 'handlerPassword',
              payload: e.detail.value
            })
          }
        />
      </View>

      {/*登陆按钮*/}
      <Button onClick={submit}>登陆</Button>

      {/*注册入口*/}
      <View
        className='register'
        onClick={() => Taro.navigateTo({ url: 'pages/register/index' })}
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
