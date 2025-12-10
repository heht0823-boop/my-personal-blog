import { createRouter, createWebHistory } from 'vue-router'
import AuthLayout from '@/layouts/auth.vue'
import DefaultLayout from '@/layouts/default.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    //公开路由(不需要登录)
    {
      path: '/',
      component: DefaultLayout,
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'Home',
          component: () => import('@/pages/home/index.vue'),
        },
        {
          path: 'article/list',
          name: 'ArticleList',
          component: () => import('@/pages/article/list.vue'),
        },
        {
          path: 'article/detail/:id',
          name: 'ArticleDetail',
          component: () => import('@/pages/article/detail.vue'),
        },
        {
          path: 'article/search?keyword=:keyword',
          name: 'ArticleSearch',
          component: () => import('@/pages/article/search.vue'),
        },
        { path: 'about', name: 'About', component: () => import('@/pages/about/index.vue') },
      ],
    },
    //认证路由(需要登录)
    {
      path: '/auth',
      component: AuthLayout,
      children: [
        {
          path: 'login',
          name: 'Login',
          component: () => import('@/pages/auth/login.vue'),
        },
        {
          path: 'register',
          name: 'Register',
          component: () => import('@/pages/auth/register.vue'),
        },
      ],
    },
    // 需登录的路由
    {
      path: '/user',
      component: DefaultLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: 'profile',
          name: 'UserProfile',
          component: () => import('@/pages/user/profile.vue'),
        },
        {
          path: 'articles',
          name: 'UserArticles',
          component: () => import('@/pages/user/articles.vue'),
        },
        {
          path: 'settings',
          name: 'UserSettings',
          component: () => import('@/pages/user/settings.vue'),
        },
      ],
    },
    // 404路由
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/pages/404.vue') },
  ],
})
// 路由守卫：验证登录状态
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.token) {
    // 未登录跳登录页
    next({ path: '/auth/login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})

export default router
