import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  setAccessToken,
  getAccessToken,
  getRefreshToken,
  setRefreshToken,
  removeAllTokens,
} from '@/utils/auth'
import { refreshToken as refreshTokenService, logout as logoutService } from '@/services/auth'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const accessToken = ref(getAccessToken())
    const refreshToken = ref(getRefreshToken())
    // 设置token
    function setTokens(accessTokenVal, refreshTokenVal) {
      try {
        accessToken.value = accessTokenVal
        refreshToken.value = refreshTokenVal
        setAccessToken(accessTokenVal)
        setRefreshToken(refreshTokenVal)
      } catch (error) {
        console.log('设置token失败', error)
      }
    }

    // 移除token
    function removeTokens() {
      accessToken.value = null
      refreshToken.value = null
      removeAllTokens()
    }
    // 刷新token
    async function refreshAccessToken() {
      if (!refreshToken.value) {
        throw new Error('无刷新token')
      }
      try {
        const data = {
          refresh: refreshToken.value,
        }
        const response = await refreshTokenService(data)
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response
        setTokens(newAccessToken, newRefreshToken)
        return { accessToken: newAccessToken, refreshToken: newRefreshToken }
      } catch (error) {
        removeTokens()
        throw error
      }
    }

    // 登出
    async function logout() {
      try {
        // 调用后端登出接口
        await logoutService()
        // 移除本地token
        removeTokens()
      } catch (error) {
        // 即使接口调用失败，也清除本地token
        removeTokens()
        console.error('登出接口调用失败:', error)
      }
    }

    return {
      accessToken,
      refreshToken,
      setTokens,
      removeTokens,
      refreshAccessToken,
      logout,
    }
  },
  {
    persist: {
      key: 'auth-store',
      storage: localStorage,
      paths: ['accessToken', 'refreshToken'],
    },
  },
)
