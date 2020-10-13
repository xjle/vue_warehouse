import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    children: [
      { path: '', name: 'Homepage', component: () => import('@/views/Homepage.vue') },
      { path: 'setting', name: 'setting', component: () => import('@/views/Setting.vue') },
      { path: 'management', name: 'mamagement', component: () => import('@/views/Management.vue') },
    ]
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('@/views/user/index.vue')
  },
  {
    path: '/forget',
    name: 'Forget',
    component: () => import('@/views/Forget.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
