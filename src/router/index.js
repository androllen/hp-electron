import Vue from 'vue'
import VueRouter from 'vue-router'
import Shell from '../views/Shell.vue'

const WafCheck = () => import('../views/modules/WafCheck.vue')
const CdnDetect = () => import('../views/modules/CdnDetect.vue')
const EmailGather = () => import('../views/modules/EmailGather.vue')

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/info_cdn' },
  {
    path: '/',
    component: Shell,
    children: [
      { path: '/info_cdn', component: CdnDetect },
      { path: '/info_waf', component: WafCheck },
      { path: '/info_email', component: EmailGather }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
