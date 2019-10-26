import Taro, { useEffect } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { useSelector, useDispatch } from '@tarojs/redux';
import { IFunctionConfig } from '../../types/fcomponent';
import Capsule from '../../components/capsule';
import Headswiper from './components/head_swiper';
import Statistics from './components/statistics';
import Bulletin from './components/bulletin';
import Shelvebar from './components/shelveBar';

import style from './index.module.scss';

let Index = (() => {
  const { bulletinWord, dayNumber, weekNumber, cyclePhoto, shelveNumber } = useSelector(
    (state: any) => state.index
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const token: string = Taro.getStorageSync('token');
    if (!token) {
      Taro.redirectTo({
        url: '/pages/login/index'
      });
      return
    }
    dispatch({
      type: 'index/handleInit'
    });
  }, []);

  return (
    <View>
      <Headswiper pics={cyclePhoto} />
      <Capsule number={0} displayName={true} />
      <View className={style.welcome}>
        <Text>欢迎您 亲爱的设计师</Text>
      </View>
      <Statistics week={weekNumber} day={dayNumber} />
      <Bulletin content={bulletinWord} />
      <Shelvebar num={shelveNumber}/>
    </View>
  );
}) as IFunctionConfig;

Index.config = {
  navigationStyle: 'custom'
};

export default Index;

// export default class Index extends Component<{}, IState> {
//   config: Config = {
//     navigationStyle: 'custom'
//   };

//   componentWillMount() {
//     const token: string = Taro.getStorageSync('token');

//     // if ('543' == '') {
//     //   //未登录
//     //   Taro.redirectTo({
//     //     url: '../login/index'
//     //   });
//     // } else {
//     //   //已登录
//     //   //公告
//     //   Taro.request({
//     //     url: 'https://wghtstudio.cn/mini/notice',
//     //     method: 'GET',
//     //     header: {
//     //       token: token
//     //     }
//     //   }).then(res => {
//     //     console.log(res);
//     //     if (res.data.status == 'success') {
//     //       this.setState({
//     //         bulletinWord: res.data.data
//     //       });
//     //     } else {
//     //       Taro.showToast({
//     //         title: '获取公告错误',
//     //         icon: 'warning'
//     //       });
//     //     }
//     //   });
//     //   //统计数据
//     //   Taro.request({
//     //     url: 'https://wghtstudio.cn/mini/record/count',
//     //     method: 'GET',
//     //     header: {
//     //       token: token
//     //     }
//     //   }).then(res => {
//     //     console.log(res);
//     //     if (res.data.status == 'success') {
//     //       this.setState({
//     //         dayNumber: res.data.day,
//     //         weekNumber: res.data.week
//     //       });
//     //     } else {
//     //       Taro.showToast({
//     //         title: '获取统计错误',
//     //         icon: 'warning'
//     //       });
//     //     }
//     //   });
//     //   //轮播图
//     //   Taro.request({
//     //     url: 'https://wghtstudio.cn/mini/img/cycle',
//     //     method: 'GET',
//     //     header: {
//     //       token: token
//     //     }
//     //   }).then(res => {
//     //     console.log(res);
//     //     if (res.data.status == 'success') {
//     //       this.setState({
//     //         cyclePhoto: res.data.data
//     //       });
//     //     } else {
//     //       Taro.showToast({
//     //         title: '获取轮播图错误',
//     //         icon: 'warning'
//     //       });
//     //     }
//     //   });
//     // }
//   }
//   //样例公告
//   // bulletinWord = '每人每天额定700张图片，请确定是否满足额度';

//   render() {
//     return (

//     );
//   }
// }
