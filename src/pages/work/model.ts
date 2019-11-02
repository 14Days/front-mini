import {fetchTag, commitTagInfo, shelveImg} from '../../services/work';
import {fetchCount, fetchImg, fetchShelve} from '../../services';
import Taro from '@tarojs/taro';

export default {
  namespace: 'work',
  state: {
    status: 'work',
    imgArr: [],
    dayNumber: 0,
    currImgIndex: 0,
    pickedTag: {},
    tags: [],
    loadSuccess: false
  },
  reducers: {
    save(state, {payload}) {
      return {
        ...state,
        ...payload
      };
    },
    handleChooseTag(state, {payload}) {
      //点击 tag 时触发,变灰变绿
      let {pickedTag} = state;
      let {tagID} = payload;
      //先判断 id 是否在
      tagID += '';

      if (pickedTag[tagID] === 0 || pickedTag[tagID] === undefined)
      //不存在
        pickedTag[tagID] = 1;
      // 已存在
      else pickedTag[tagID] = 0;

      return {
        ...state,
        pickedTag
      };
    },
    triggerLoad(state){
      //加载完成后触发,然后才能点击打标按钮.
      return {
        ...state,
        loadSuccess: true
      }
    }
  },
  effects: {
    * handleInitPage(_, {put, call, all}) {
      //页面初始化,获取图片
      const imgRes = yield fetchImg();

      yield put({
        type: 'save',
        payload: {
          imgArr: imgRes.data,
          currImgIndex: 0
        }
      });

      const [count, tags] = yield all([call(fetchCount), call(fetchTag)]);
      yield put({
        type: 'save',
        payload: {
          tags: tags.data,
          dayNumber: count.data.day,
          pickedTag: {},
        }
      });

    },
    * handleInitShelvePage(_, {put, call, all}) {
      //页面初始化,获取图片
      const imgRes = yield fetchShelve();
      yield put({
        type: 'save',
        payload: {
          imgArr: imgRes.data,
          currImgIndex: 0,
          status: 'shelve'
        }
      });

      const [count, tags] = yield all([call(fetchCount), call(fetchTag)]);
      yield put({
        type: 'save',
        payload: {
          tags: tags.data,
          dayNumber: count.data.day,
          pickedTag: {},
        }
      });
      Taro.showToast({
        icon: 'none',
        title: '您可以右滑返回首页😬',
        duration: 2000
      })
    },
    * handleClickNext(_, {select, put}) {
      //点击下一张图片时触发,切换到下一张,或者重新拉取新的一组图片
      let {imgArr, currImgIndex, pickedTag: tag, dayNumber, status} = yield select(
        state => state.work
      );

      const img_id = imgArr[currImgIndex].id;
      let postTags: Array<number> = []; //要发送的数据
      for (let props in tag) {
        if (tag[props] === 1) postTags.push(parseInt(props));
      }

      // 检查是否选够了标签
      if (postTags.length <= 1) {
        Taro.showToast({
          icon: 'none',
          title: '请至少选择两个标签哦☺️'
        });
        return;
      }

      yield commitTagInfo(img_id, postTags);
      // 成功,打标数加一,然后切换到下一张图片
      currImgIndex++;

      if (currImgIndex === imgArr.length) {
        //打标状态直接初始化
        if (status === 'work') {
          yield put({
            type: 'handleInitPage'
          });
        } else {
          //处理搁置状态,返回首页,并显示提示
          Taro.switchTab({url: '../index/index'});
          Taro.showToast({
            icon: 'none',
            title: '您浏览完了所有的搁置任务!'
          })
        }
      } else {
        // 进入下一张图,其他状态清空
        yield put({
          type: 'save',
          payload: {
            currImgIndex,
            pickedTag: {},
            dayNumber: dayNumber + 1,
            loadSuccess: false
          }
        });
      }

      //更新首页数据
      yield put({
        type:'index/handleRefresh'
      })
    },
    * handleClickUnknown(_, {put, select}) {
      //点击搁置按钮触发,调到下一张图片或者拉取新的一组
      //发送信息至服务器
      let {imgArr, currImgIndex, status} = yield select(
        state => state.work
      );

      const img_id = imgArr[currImgIndex].id;
      yield shelveImg(img_id);
      Taro.showToast({
        icon: 'none',
        title: '提交搁置成功,被搁置的图片可在首页重新打标!',
        duration: 1500
      });

      //进入下一张图片
      if (currImgIndex + 1 === imgArr.length) {
        if (status === 'work') {
          yield put({
            type: 'handleInitPage'
          });
        } else {
          //处理搁置状态,返回首页,并显示提示
          Taro.switchTab({url: '../index/index'});
          Taro.showToast({
            icon: 'none',
            title: '您浏览完了所有的搁置任务'
          })
        }
      } else {
        yield put({
          type: 'save',
          payload: {
            currImgIndex: currImgIndex + 1,
            loadSuccess: false
          }
        });
      }
    }
  }
};
