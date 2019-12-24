import Taro, {useEffect} from '@tarojs/taro';
import {View, Text} from '@tarojs/components';
import {useSelector, useDispatch} from '@tarojs/redux';
import {fcomponent} from 'typings/fcomponent';

import Capsule from '../../components/capsule';
import Headswiper from './components/head_swiper';
import Statistics from './components/statistics';
import Bulletin from './components/bulletin';
import Shelvebar from './components/shelveBar';

import style from './index.module.scss';

let Index = (() => {
  const {bulletinWord, dayNumber, weekNumber, cyclePhoto} = useSelector(
    (state: any) => state.index,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const token: string = Taro.getStorageSync('token');
    if (!token) {
      Taro.redirectTo({
        url: '/pages/login/index',
      });
      return;
    }
    dispatch({
      type: 'index/handleInit',
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
      <Bulletin content={bulletinWord.content} />
      <Shelvebar />
    </View>
  );
}) as fcomponent.IFunctionConfig;

Index.config = {
  navigationStyle: 'custom',
};

export default Index;
