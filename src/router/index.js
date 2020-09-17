import Vue from 'vue'
import VueRouter from 'vue-router'
import Shell from '../views/Shell.vue'

import { importPage } from '../utils'
//https://router.vuejs.org/zh/guide/advanced/lazy-loading.html 
//https://segmentfault.com/a/1190000012726956
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/info_cdn',
    component: Shell,
    children: [
      { path: '/info_cdn', component: importPage("CdnDetect") },
      { path: '/info_waf', component: importPage("WafCheck") },
      { path: '/info_email', component: importPage("EmailGather") }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
