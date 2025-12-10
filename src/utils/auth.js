const ACCESS_TOKEN_KEY = 'access_token'
const REFRESH_TOKEN_KEY = 'refresh_token'

// 存储访问token（1小时有效期）
export const setAccessToken = (accessToken) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
}

// 获取访问token
export const getAccessToken = () => {
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}

// 删除访问token
export const removeAccessToken = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
}

// 存储刷新token（7天有效期）
export const setRefreshToken = (refreshToken) => {
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
}

// 获取刷新token
export const getRefreshToken = () => {
  return localStorage.getItem(REFRESH_TOKEN_KEY)
}

// 删除刷新token
export const removeRefreshToken = () => {
  localStorage.removeItem(REFRESH_TOKEN_KEY)
}

// 清除所有token
export const removeAllTokens = () => {
  removeAccessToken()
  removeRefreshToken()
}

// 判断是否登录（仅检查访问token）
export const isLogin = () => {
  return !!getAccessToken()
}

export const PAGE_SIZE = 10 // 默认分页条数
export const PAGE = 1 // 默认分页页码

export const ARTICLE_STATUS = {
  DRAFT: 0, // 草稿
  PUBLISHED: 1, // 已发布
}
