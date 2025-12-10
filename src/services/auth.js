import request from '@/utils/request'

//登录
export const login = async (data) => {
  return await request({
    method: 'post',
    url: '/user/login',
    data,
  })
}
//注册
export const register = async (data) => {
  return await request({
    method: 'post',
    url: '/user/register',
    data,
  })
}
//刷新token
export const refreshToken = async (data) => {
  return await request({
    method: 'post',
    url: '/user/refresh-token',
    data,
  })
}
//登出
export const logout = async () => {
  return await request({
    method: 'post',
    url: '/user/logout',
  })
}

export default {
  login,
  register,
  refreshToken,
  logout,
}
