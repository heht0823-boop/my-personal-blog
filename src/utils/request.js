// src/utils/request.js
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { getAccessToken } from './auth'

// 创建axios实例
const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // 配置环境变量
  timeout: 10000,
})
// 请求拦截器
service.interceptors.request.use(
  (request) => {
    // 设置Content-Type
    request.headers['Content-Type'] = 'application/json;charset=UTF-8'
    // 添加token到请求头（只使用accessToken）
    const token = getAccessToken()
    if (token) {
      request.headers['Authorization'] = `Bearer ${token}`
    }
    return request
  },
  (error) => {
    ElMessage.error('请求错误')
    return Promise.reject(error)
  },
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const { code, message, data } = response.data
    // 根据后端返回的code进行处理
    if (code === 200 || code === 201) {
      return data
    } else {
      ElMessage.error(message || '请求失败')
      return Promise.reject(new Error(message || '请求失败'))
    }
  },
  async (error) => {
    const { response } = error
    // token过期（后端返回401）
    if (response && response.status === 401) {
      const { useAuthStore } = await import('@/stores/auth')
      const authStore = useAuthStore()
      // 刷新token
      try {
        await authStore.refreshAccessToken()
        // 重新发起原请求
        return service(error.config)
      } catch (refreshError) {
        console.error('Token刷新失败:', refreshError)
        ElMessage.error('登录已过期，请重新登录')
        // 刷新失败，跳登录页
        authStore.logout()
        window.location.href = '/login'
      }
    }
    // 其他错误提示
    ElMessage.error(error.response?.data?.msg || '服务器错误')
    return Promise.reject(error)
  },
)
export default service
