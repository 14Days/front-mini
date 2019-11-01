import Taro from '@tarojs/taro';
import { View, Button } from '@tarojs/components';
import { useDispatch } from '@tarojs/redux';

import './operate_bar.scss';

export default function Operatebar() {
  const dispatch = useDispatch();
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
      >
        确定，下一张
      </Button>
    </View>
  );
}
