import Taro from '@tarojs/taro';
import { View, Button } from '@tarojs/components';
import {useDispatch, useSelector} from '@tarojs/redux';

import './operate_bar.scss';

export default function Operatebar() {
  const dispatch = useDispatch();
  const {loadSuccess} = useSelector((state:any) => state.work);
  return (
    <View className='header'>
      <Button
        className='abutton'
        onClick={() => {
          dispatch({
            type: 'work/handleClickUnknown'
          });
        }}
      >
        不确定，先搁置
      </Button>
      <Button
        className='abutton'
        onClick={() => {
          dispatch({
            type: 'work/handleClickNext',
          });
        }}
        disabled={!loadSuccess}
      >
        确定，下一张
      </Button>
    </View>
  );
}
