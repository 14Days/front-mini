# front-mini

## 描述

**利用色彩心理学理论通过终端客户对色彩的喜好预测客户性格爱好，然后根据其性格爱好推荐家居设计方案是项目的核心功能。**

家居设计素材库构建及推荐系统是其中的子系统，功能有：
编写python爬虫程序根据爬取规则从相关的设计网站爬取家居设计方案的图片和文字描述，从文字描述识别出图片标签，给图片打标，构建家居设计素材库，并提供素材库的管理功能；根据终端客户性格喜好，完成从素材库中推荐家居设计方案。

**本项目是给设计师提供一个为图片打标的小程序(前端).**

## 环境依赖
1. node
2. @tarojs/cli
3. Typescript

## 环境部署

1. 安装@tarojs/cli
	`yarn global add @tarojs/cli`
2. 编译
	`yarn build:weapp`
3. 监听文件实时编译
	`yarn dev:weapp`

## API

见项目back-mini.

https://github.com/14Days/back_mini

### Mock

fast-mock

根地址`https://www.fastmock.site/mock/06aee04415ba130a12bc60a55a6a2585/lucky`



## 目录结构描述

			.
			├── config
			└── src
				├── common
				│   ├── globalData
				│   └── style
				├── components
				├── interface
				├── pages
				│   ├── index
				│   ├── info
				│   ├── login
				│   ├── marklabel
				│   ├── register.ts
				│   └── work
				└── static
	    			└── images

## 版本迭代内容

### v1.0

#### v1.1
功能 1
功能 2

#### v1.2
功能1
功能 3
### v2.0

## 需求

待撰写, 先请去 TAPD查看.

- [ ] 一级需求
	- [ ] 二级需求
	- [ ] 二级需求
		- [ ] 三级需求
		- [ ] 三级需求
	- [ ] 二级需求 
- [ ] 一级需求
- [ ] 一级需求

## 备注


## 版权信息


