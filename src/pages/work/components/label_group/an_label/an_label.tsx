import Taro from '@tarojs/taro'
import {View, Text, Icon} from '@tarojs/components'
import './an_label.scss'
import {useDispatch, useSelector} from "@tarojs/redux";

export default function Anlable(props) {
  const dispatch = useDispatch();
  const {pickedTag} = useSelector((state:any) => state.work);
  let styleIc = {
    opacity: 0,
  };
  let styleBg = {
    background: '#8A8585',
  };

  /* 被选中的变绿 */
  if (pickedTag[props.tagID+''] === 1) {
    styleIc.opacity = 1;
    styleBg.background = 'rgba(139, 195, 74, 1);';
  }

  return (
    <View
      className='anlabel'
      style={styleBg}
      onClick={() => dispatch({
        type: 'work/handleChooseTag',
        payload: {
          tagID: props.tagID
        }
      })}
    >
      <Text className='name'>{props.name}</Text>
      <Icon size='20' className='ic' type='success_no_circle' color='white' style={styleIc}/>
    </View>
  )

}
