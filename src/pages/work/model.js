import {fetchTag, commitTagInfo} from "../../services/work";
import {fetchCount, fetchImg} from "../../services";
import Taro from '@tarojs/taro'

export default {
  namespace: 'work',
  state: {
    imgArr: [],
    dayNumber: 0,
    currImgIndex: 0,
    pickedTag: [],
    tags: []
  },
  reducers: {
    save(state, {payload}) {
      return {
        ...state,
        ...payload
      }
    },
    handleChooseTag(state, {payload}) {
      let {pickedTag} = state;
      let {tagID} = payload;
      //先判断 id 是否在
      let index = pickedTag.indexOf(tagID);

      if (index === -1)  //不存在
        pickedTag.push(tagID);
      else  // 已存在
        pickedTag.splice(index, 1);

      return {
        ...state,
        pickedTag
      }
    }
  },
  effects: {
    * handleInitPage(_, {put}) {
      const imgRes = yield fetchImg();

      yield put({
        type: 'save',
        payload: {
          imgArr: imgRes.data,
          currImgIndex: 0
        }
      })
    },
    * handleImgOnLoad(_, {put, all, call}){
      const [count, tags] = yield all([
        call(fetchCount),
        call(fetchTag)
      ]);
      yield put({
        type: 'save',
        payload: {
          tags: tags.data,
          dayNumber: count.data.day,
          pickedTag: []
        }
      })
    },
    * handleClickNext(_, {select, put}) {
      let {imgArr, currImgIndex, pickedTag: tag, dayNumber} = yield select(state => state.work);
      const img_id = imgArr[currImgIndex].id;

      // 检查是否选够了标签
      if(tag.length <= 1){
        Taro.showToast({
          icon: 'none',
          title: '请至少选择两个标签哦☺️'
        });
        return;
      }

      try {
        const res = yield commitTagInfo(img_id, tag);
        if (res.status === 'success') {                         // 成功,打标数加一,然后切换到下一张图片
          currImgIndex++;

          if (currImgIndex === imgArr.length) {                 // 最后一张图, 重新请求新的一轮图片, 初始化即可
            yield put({
              type: 'handleInitPage'
            })
          } else {                                            // 进入下一张图,其他状态清空
            yield put({
              type: 'save',
              payload: {
                currImgIndex,
                pickedTag: [],
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
    * handleClickUnknown(_, {put, select}) {
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
