import { Config } from '@tarojs/taro';

export interface IFunctionConfig {
  (props: any): JSX.Element;
  config?: Config;
}
