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
