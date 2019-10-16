import Taro, { Component, Config, useReducer } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'

import StatusBar from '../../components/statusBar'
import Head from '../../components/head'
import Capsule from '../../components/capsule'
import Labelpage from './components/label_page/label_page'
import Headstand from './components/head_stand/head_stand'
import OperateBar from './components/operate_bar/operate_bar'

export default class Index extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    //navigationBarTitleText: '首页'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {

    // 一组对象的形式：
    // title： String
    // label： Array （下方到AnLabel）


    //pageid一定要对
    const arrs =[
      {
        title :  '色系',
        pageid : 0,
        labels : [
          {
            name: '黄色',
            id: 1,
            ifChoose: false,
          },
          {
            name: '绿色',
            id: 2,
            ifChoose: false,
          },
          {
            name: '黄色',
            id: 3,
            ifChoose: false,
          },
          {
            name: '绿色',
            id: 4,
            ifChoose: false,
          },
          {
            name: '黄色',
            id: 5,
            ifChoose: false,
          },
          {
            name: '绿色',
            id: 6,
            ifChoose: false,
          },
          {
            name: '黄色',
            id: 7,
            ifChoose: false,
          },
          {
            name: '绿色',
            id: 8,
            ifChoose: false,
          },
        ],
      },
      {
        title :  '号牌',
        pageid : 1,
        labels : [
          {
            name: '黄色',
            id: 9,
            ifChoose: false,
          },
          {
            name: '绿色',
            id: 10,
            ifChoose: false,
          },
          {
            name: '黄色',
            id: 11,
            ifChoose: false,
          },
          {
            name: '绿色',
            id: 12,
            ifChoose: false,
          },
          {
            name: '黄色',
            id: 13,
            ifChoose: false,
          },
          {
            name: '绿色',
            id: 14,
            ifChoose: false,
          },
          {
            name: '黄色',
            id: 15,
            ifChoose: false,
          },
          {
            name: '绿色',
            id: 16,
            ifChoose: false,
          },
        ],
      },
    ]

    //更改处理器
    const changeDisplay = (state, action) => {  
      let v = JSON.parse(JSON.stringify(state))
      console.log('haha' + action.pageid)
      console.log('jiji' + action.id)
      for (let i=0; i<v.length ;i++) {
        if (v[i].pageid == action.pageid) {
          for (let j=0; j<v[i].labels.length; j++) {
            
            if (v[i].labels[j].id == action.id) {
              v[i].labels[j].ifChoose = !state[i].labels[j].ifChoose
              console.log('hehe')
              return v
            }
          }
        }
      }
      return v
    } 

    //useReducer管理整个标签面板
    const [stat, dispatch] = useReducer(changeDisplay, arrs)

    return (
      <View className='doing'>
        <StatusBar />
        <Head />
        <Capsule number={5}/>
        <OperateBar />
        <Headstand />
        {
          stat.map( (ele) => {
            return <Labelpage key={ele.pageid} title={ele.title} labels={ele.labels} doing={dispatch} pageid={ele.pageid}/>
          })
        }
        <View className='takeplace' />
      </View>
    )
  }
}
