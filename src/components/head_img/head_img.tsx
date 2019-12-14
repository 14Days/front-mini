import Taro from '@tarojs/taro';
import {View, Image} from '@tarojs/components';
import {useDispatch} from '@tarojs/redux';

import './head_img.scss';

interface IProps {
  url: string;
}

export default function Head(props: IProps) {
  const dispatch = useDispatch();
  return (
    <View>
      <Image
        src={`http://pull.wghtstudio.cn/img/${props.url}`}
        mode="aspectFill"
        className="header"
        onLoad={() => {
          dispatch({
            type: 'work/triggerLoad',
          });
        }}
      />
    </View>
  );
}
