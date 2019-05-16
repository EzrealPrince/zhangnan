import request from '../utils/request'
const API_ROOT = 'https://www.ezrealprince.com'

// 获取主页列表
export function getHomeList (data = {}) {
  return request({url: API_ROOT + '/api/getArticleList', method: 'post', data})
}

// 获取文章内容
export function getArticle (data = {}) {
  return request({url: API_ROOT + '/api/getArticleDetails', method: 'post', data})
}

// 根据 文章 id 获取 comments
export function getComments (data = {}) {
  return request({url: API_ROOT + '/api/comments' + data.articleId, method: 'get'})
}
// 登录
export function login(data = {})  {
  return request({url: API_ROOT + '/api/login', method: 'post', data})
}
// 获取学习记录
export function getLearnedCourse(data = {})  {
  return request({url: API_ROOT + '/api/getLearnedCourse', method: 'post', data})
}
// 修改学习记录
export function changeLearnedCourse(data = {})  {
  return request({url: API_ROOT + '/api/changeLearnedCourse', method: 'post', data})
}
// 修改学习时长
export function changeLearnedTime(data = {})  {
  return request({url: API_ROOT + '/api/changeLearnedTime', method: 'post', data})
}
