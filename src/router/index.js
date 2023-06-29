import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import SkyWayView from '../views/SkyWayView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/skyway',
      name: 'skyway',
      component: SkyWayView
    },
    {
      path: '/',
      redirect: '/login'
    }
  ]
})

export default router
