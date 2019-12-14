import Taro, {Component, Config} from '@tarojs/taro';
import {View} from '@tarojs/components';
import {connect} from '@tarojs/redux';
import Headimg from '../../components/head_img/head_img';
import Capsule from '../../components/capsule';
import LabelGroup from '../../components/label_group/label_group';
import OperateBar from '../../components/operate_bar/operate_bar';

import './index.scss';

interface markImg {
  id: number;
  url: string;
}

interface IWorkProps {
  imgArr: Array<markImg>;
  dayNumber: number;
  currImgIndex: number;
  pickedTag: object;
  tags: Array<object>;
  dispatch: Function;
}

class Work extends Component<IWorkProps, {}> {
  config: Config = {
    navigationStyle: 'custom',
  };

  componentWillMount(): void {
    this.props.dispatch({
      type: 'work/handleInitPage',
    });
  }

  onTabItemTap(): void {
    this.props.dispatch({
      type: 'work/handleInitPage',
    });
  }

  render() {
    const {currImgIndex, dayNumber, imgArr} = this.props;
    return (
      <View className="doing">
        <Headimg url={imgArr[currImgIndex].url} />
        <Capsule number={dayNumber} displayName={false} />
        <View className="headerPlace" />
        {this.props.tags.map((ele: any) => {
          return (
            <LabelGroup key={ele.top} title={ele.top} labels={ele.second} />
          );
        })}
        {/*底部占位，让标签页拉满*/}
        <OperateBar />
        <View className="takeplace" />
      </View>
    );
  }
}

export default connect(state => state.work)(Work);
