
import request from '@/utils/request'

// 获取我的频道
export const getMyChannels = () => {
  return request({
    url: '/user/channels'

  })
}

// eslint-disable-next-line camelcase
export const getArticles = ({ channel_id, timestamp }) => {
  return request({
    url: '/articles',
    params: { channel_id, timestamp }
  })
}

// 获取所有频道

export const getAllArt = () => {
  return request({
    url: '/channels'
  })
}
