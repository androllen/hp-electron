import { importPage } from '../utils'

// 页面路由
export default () => [
  { path: '/info_cdn', component: importPage("CdnDetect") },
  { path: '/info_waf', component: importPage("WafCheck") },
  { path: '/info_email', component: importPage("EmailGather") }
]
