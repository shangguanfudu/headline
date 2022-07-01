import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '@/views/Login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login')
  },
  {
    path: '/',
    redirect: '/layout/home'
  },
  {
    path: '/layout',
    name: 'layout',
    component: () => import('@/views/Layout'),
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/Home')
      },
      {
        path: 'video',
        name: 'video',
        component: () => import('@/views/Video')
      },
      {
        path: 'ask',
        name: 'ask',
        component: () => import('@/views/Ask')
      },
      {
        path: 'my',
        name: 'my',
        component: () => import('@/views/My')
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/Search')
  }
]

const router = new VueRouter({
  routes
})

export default router
