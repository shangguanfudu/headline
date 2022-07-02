import request from '@/utils/request'

/**
 * 获取搜索联想建议
 */
export const getSearchSuggest = q => {
  return request({
    url: '/suggestion',
    params: { q }
  })
}
// 获取搜索结果
/**
 *
 * @param page 当前是第几页，per_page每页数量，q搜索关键字
 * @returns
 */
// eslint-disable-next-line camelcase
export const getSearchRes = ({ page = 1, per_page, q }) => {
  return request({
    url: '/search',
    params: {
      page, per_page, q
    }
  })
}
