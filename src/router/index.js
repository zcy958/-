import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../module/login/login.vue')
  },
  // {
  //   path: '/home',
  //   name: 'home',
  //   component: () => import('../module/admin/home.vue'),
  //   children:[
  //     {
  //       path: '/home/detail',
  //       name: 'detail',
  //       component: () => import('../module/admin/detail.vue')
  //     },
  //     {
  //       path: '/home/user',
  //       name: 'user',
  //       component: () => import('../module/admin/user/user.vue')
  //     },
  //     {
  //       path: '/home/module',
  //       name: 'module',
  //       component: () => import('../module/admin/user/module.vue')
  //     },
  //     {
  //       path: '/home/role',
  //       name: 'role',
  //       component: () => import('../module/admin/user/role.vue')
  //     },
  //     {
  //       path: '/home/game',
  //       name: 'game',
  //       component: () => import('../module/admin/game/game.vue')
  //     },
  //     {
  //       path: '/home/game_type',
  //       name: 'game_type',
  //       component: () => import('../module/admin/game/game_type.vue')
  //     },
  //   ]
  // },
]

const router = new VueRouter({
  routes
})

export default router
