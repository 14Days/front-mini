import Taro from '@tarojs/taro'
import {fetchCode, fetchLogin, fetchRegister} from "../../services/register";
import showToast = Taro.showToast;

const delay = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

function matchPhoneNumber(phoneNumber: string) {
  if (phoneNumber.length === 11) {
    const reg = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/;
    return reg.test(phoneNumber)
  } else return false
}

export default {
  namespace: 'register',
  state: {
    phoneNumber: '',
    username: '',
    password: '',
    firstPassword: '',
    secondPassword: '',
    code: '',
    step: 1,
    sendText: '下一步',
    unableSend: true,  //直接控制‘下一步’按钮状态, 输入手机号格式正确时
    isRepeat: false,  //是否正在重发读秒
    frontTip: '',  //发送提示
  },
  reducers: {
    save(state, {payload: data}) {
      return {
        ...state,
        ...data
      }
    },
    changePhoneNumber(state, {payload: data}) {
      //检查手机号, 改变下一步按钮的状态
      let ifPhoneCorrect = matchPhoneNumber(data.phoneNumber);
      return {
        ...state,
        phoneNumber: data.phoneNumber,
        unableSend: data.isRepeat || !ifPhoneCorrect
      }
    },
    loopCount(state, {payload: data}) {
      if (data.count > 0) {
        return {
          ...state,
          sendText: `${data.count} 秒后重新发送`
        }
      } else {
        return {
          ...state,
          unableSend: false,
          frontTip: '',
          sendText: '重新发送'
        }
      }
    },
    cleanCode(state,{payload}) {
      return {
        ...state,
        firstPassword: '',
        secondPassword: '',
        code: ''
      }
    },
    checkShowTip(state, {payload}) {
      const {phoneNumber, firstPassword, secondPassword, code, username} = payload;
      let resTip = '';
      if (!matchPhoneNumber(phoneNumber))
        resTip = '手机号格式不正确';
      if (code.length !== 4)
        resTip = '验证码格式不正确';
      if (firstPassword === '' || secondPassword === '' || username === '')
        resTip = '请将信息填写完整';
      if (firstPassword !== secondPassword)
        resTip = '两次密码不相同';

      return {
        ...state,
        frontTip: resTip,
      }
    }
  },
  effects: {
    * handleRequestCode(_, {select, put, call}) {

      const {phoneNumber: phone} = yield select(state => state.register);
      fetchCode({phone})
        .then((res: any) => {
            console.log(res);
            if (res.status !== 'success') {
              Taro.showToast({
                icon: 'none',
                title: res.err_msg
              });
            }
          }
        );

      yield put({
        type: 'save',
        payload: {
          frontTip: `已发送验证码到${phone}`,
          unableSend: true,
          isRepeat: true,
          step: 2
        }
      });

      for (let i = 60; i >= 0; i--) {
        yield put({
          type: 'loopCount',
          payload: {
            count: i
          }
        });
        yield call(delay, 1000);
      }
    },
    * handleConfirm(_, {select}) {
      const {phoneNumber: phone, firstPassword:password, code, username:name} = yield select(state => state.register);
      yield fetchRegister({name, password, code, phone})
        .then((res:any) => {
          if(res.status != 'success'){
            Taro.showToast({
              icon: 'none',
              title: res.err_msg
            })
          } else {
            fetchLogin({username:name, password})
              .then((res:any) => {
                if(res.status === 'success')
                  Taro.switchTab({url:'../index/index'});
                else {
                  Taro.showToast({
                    icon: 'none',
                    title: res.err_mas
                  })
                }
              })
          }
        })
    }
  }
}
