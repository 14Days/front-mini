import {Config} from '@tarojs/taro';
declare module fcomponent {
  export interface IFunctionConfig {
    (props: any): JSX.Element;
    config?: Config;
  }
}
