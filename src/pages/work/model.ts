import {fetchTag, commitTagInfo} from "../../services/work";
import {fetchCount, fetchImg} from "../../services";
import Taro from '@tarojs/taro'

export default {
  namespace: 'work',
  state: {
    imgArr: [],
    dayNumber: 0,
    currImgIndex: 0,
    pickedTag: {},
    tags: []
  },
  reducers: {
    save(state, {payload}) {
      return {
        ...state,
        ...payload
      }
    },
    handleChooseTag(state, {payload}) {           //点击 tag 时触发,变灰变绿
      let {pickedTag} = state;
      let {tagID} = payload;
      //先判断 id 是否在
      tagID += '';

      if (pickedTag[tagID] === 0 || pickedTag[tagID] === undefined)  //不存在
        pickedTag[tagID] = 1;
      else  // 已存在
        pickedTag[tagID] = 0;

      return {
        ...state,
        pickedTag
      }
    }
  },
  effects: {
    * handleInitPage(_, {put}) {                //页面初始化,获取图片
      const imgRes = yield fetchImg();

      yield put({
        type: 'save',
        payload: {
          imgArr: imgRes.data,
          currImgIndex: 0
        }
      })
    },
    * handleImgOnLoad(_, {put, all, call}){     //图片加载完成后触发,获取统计数据以及标签
      const [count, tags] = yield all([
        call(fetchCount),
        call(fetchTag)
      ]);
      yield put({
        type: 'save',
        payload: {
          tags: tags.data,
          dayNumber: count.data.day,
          pickedTag: {}
        }
      })
    },
    * handleClickNext(_, {select, put}) {       //点击下一张图片时触发,切换到下一张,或者重新拉取新的一组图片
      let {imgArr, currImgIndex, pickedTag: tag, dayNumber} = yield select(state => state.work);

      const img_id = imgArr[currImgIndex].id;
      let postTags:Array<number> = []; //要发送的数据
      for(let props in tag){
        if(tag[props] === 1)
          postTags.push(parseInt(props));
      }

      // 检查是否选够了标签
      if(postTags.length <= 1){
        Taro.showToast({
          icon: 'none',
          title: '请至少选择两个标签哦☺️'
        });
        return;
      }

      try {
        const res = yield commitTagInfo(img_id, postTags);
        if (res.status === 'success') {                         // 成功,打标数加一,然后切换到下一张图片
          currImgIndex++;

          if (currImgIndex === imgArr.length) {                 // 最后一张图, 重新请求新的一轮图片, 初始化即可
            yield put({
              type: 'handleInitPage'
            })
          } else {                                              // 进入下一张图,其他状态清空
            yield put({
              type: 'save',
              payload: {
                currImgIndex,
                pickedTag: {},
                dayNumber: dayNumber + 1
              }
            })
          }
        } else {
          // 失败,显示提示信息
          Taro.showToast({
            icon: 'none',
            title: res.err_msg
          })
        }
      } catch (e) {
        console.log(e);
      }

    },
    * handleClickUnknown(_, {put, select}) {                //点击搁置按钮触发,调到下一张图片或者拉取新的一组
      Taro.showToast({
        icon: 'none',
        title: '被搁置的图片可在首页重新打标',
        duration: 500
      });

      const {currImgIndex, imgArr} = yield select(state => state.work);
      if(currImgIndex+1 === imgArr.length){
        yield put({
          type: 'handleInitPage'
        })
      } else {
        yield put({
          type: 'save',
          payload: {
            currImgIndex: currImgIndex+1
          }
        })
      }
    }
  }
}
