import Vue from 'vue'
import VueRouter from 'vue-router'
import Shell from '../views/Shell.vue'
import getPageRoutes from './view'

//https://router.vuejs.org/zh/guide/advanced/lazy-loading.html 
//https://segmentfault.com/a/1190000012726956
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/info_cdn',
    component: Shell,
    children: getPageRoutes()
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
