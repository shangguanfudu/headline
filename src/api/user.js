
/**
 * 用户相关的请求模块
 */
import request from '@/utils/request'
/**
 * 用户登录
 */
export const login = ({ mobile, code }) => {
  return request({
    method: 'POST',
    url: '/authorizations',
    data: {
      mobile,
      code
    }
  })
}

// 短信验证码
export const getCode = (mobile) => {
  return request({
    url: `/sms/codes/${mobile}`
  })
}
// 获取用户信息
export const getInfo = () => {
  return request({
    url: '/user'

  })
}

// 设置用户频道（重置式）
export const setChannels = (channels) => {
  return request({
    method: 'PUT',
    url: '/user/channels',
    data: {
      channels
    }
  })
}
