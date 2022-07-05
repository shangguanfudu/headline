/**
 * 文章接口模块
 */
import request from '@/utils/request'

/**
  * 获取文章
  */
export const getArticleById = articleId => {
  return request({
    url: '/articles/' + articleId
  })
}

// 关注和取关
export const followUser = target => {
  return request({
    method: 'POST',
    url: '/user/followings',
    data: {
      target
    }
  })
}
export const delUser = target => {
  return request({
    method: 'DELETE',
    url: `/user/followings/${target}`
  })
}
// 收藏和取消
export const addCollect = target => {
  return request({
    method: 'POST',
    url: '/article/collections',
    data: {
      target
    }
  })
}
export const delCollect = target => {
  return request({
    method: 'DELETE',
    url: `/article/collections/${target}`
  })
}

// 点赞和取消
export const addLike = target => {
  return request({
    method: 'POST',
    url: '/article/likings',
    data: {
      target
    }
  })
}
export const delLike = target => {
  return request({
    method: 'DELETE',
    url: `/article/likings/${target}`
  })
}
