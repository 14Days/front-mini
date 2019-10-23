import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { deliverLabels } from '../../../../services/work'
import './operate_bar.scss'

interface operatebarAttr {
  info: Array<any>,  //所有的标签信息（未统计）
  imgID: number,
  toInit: Function,
  toRefresh: Function
}

export default class Operatebar extends Component<operatebarAttr> {

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

    toNext = async () => {
      //集合已选label的id
      let res: Array<number> = []
      this.props.info.map(group => {
        group.labels.map((lab: any)  => {
          if (lab.ifChoose === true) {
            res.push(lab.id)
          }
        })
      })
      console.log(res)

      //发送
      //await deliverLabels(this.props.imgID, res)

      //刷新至下一页
      this.props.toRefresh({ifRefresh: true})
      this.props.toInit()
    }

    toShelve = () => {
      //请求

      //刷新至下一页
    }
  
    render () {
    
      return (
        <View className='header'>
          <Button className='abutton'>不确定，先搁置</Button>
          <Button className='abutton' onClick={() => this.toNext()}>确定，下一张</Button>
        </View>
      )
    }
  }