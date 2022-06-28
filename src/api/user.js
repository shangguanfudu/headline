import store from '@/store'
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
    url: '/user',
    headers: {
      Authorization: 'Bearer ' + store.state.user.token
    }
  })
}
