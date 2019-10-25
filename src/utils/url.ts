import ENV from './config';

let baseURL = 'https://wghtstudio.cn/mini';

if (ENV == 'dev')
  baseURL = 'https://www.fastmock.site/mock/06aee04415ba130a12bc60a55a6a2585/lucky';

// 获取注册验证码
export const getCodeURL = `${baseURL}/user/code`;

// 注册
export const registerURL = `${baseURL}/user/account`;

// 登陆
export const loginURL = `${baseURL}/user/authorization`;

// 获取公告
export const getNoticeURL = `${baseURL}/notice`;

// 获取轮播图
export const getCycleImginURL = `${baseURL}/img/cycle`;

// 获取要打标的图片
export const getMarkImgURL = `${baseURL}/img/imgs`;

// 获取用户自定义的标签
export const getTagURL = `${baseURL}/tag`;

// 获取用户统计数据
export const getStatisticData = `${baseURL}/record/count`;

// 搁置图片
export const commitUnknownURL = `${baseURL}/img/unknown`;

// 获取被搁置的图片
export const getUnknownURL = `${baseURL}/img/unknown`;



