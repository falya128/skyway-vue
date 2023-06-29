import { createRouter, createWebHistory } from 'vue-router'
import cognito from '@/utils/cognito'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      beforeEnter: async (to, from, next) => {
        await cognito
          .getIdToken()
          .then(() => {
            next({ path: '/skyway' })
          })
          .catch(() => {
            next()
          })
      }
    },
    {
      path: '/skyway',
      name: 'skyway',
      component: () => import('../views/SkyWayView.vue'),
      beforeEnter: async (to, from, next) => {
        await cognito
          .getIdToken()
          .then(() => {
            next()
          })
          .catch(() => {
            next({ path: '/login' })
          })
      }
    },
    {
      path: '/',
      redirect: '/login'
    }
  ]
})

export default router
