import { importPage } from '../utils'

// 页面路由
export default () => [
  { name: 'CdnDetect', path: '/info_cdn', component: importPage("CdnDetect"), value: 'Cdn 检测' },
  { name: 'WafCheck', path: '/info_waf', component: importPage("WafCheck"), value: 'Waf 检测' },
  { name: 'EmailGather', path: '/info_email', component: importPage("EmailGather"), value: '邮箱地址收集' },
  { name: 'SubDomain', path: '/info_subdomain', component: importPage("SubDomain"), value: '子域名爆破' },
  { name: 'Whois', path: '/info_whois', component: importPage("Whois"), value: 'WhoIs 反查', },

  { name: 'JBossScan', path: '/exp_jboss_scan', component: importPage("JBossScan"), value: 'JBoss 检测', },
  { name: 'JBossShell', path: '/exp_jboss_shell', component: importPage("JBossShell"), value: ''},

  { name: 'JenkinsCheck', path: '/exp_jenkins_check', component: importPage("JenkinsCheck"), value: 'Jenkins 爆破', },
  { name: 'JenkinsShell', path: '/exp_jenkins_shell', component: importPage("JenkinsShell"), value:''},

  { name: 'UrlGather', path: '/tool_url', component: importPage("UrlGather"), value: 'URL 收集', },
  { name: 'Md5Query', path: '/tool_md5', component: importPage("Md5Query"), value: 'MD5 查询', },
  { name: 'PwdGenerator', path: '/tool_pwd', component: importPage("PwdGenerator"), value: '密码生成器', },
  { name: 'Decrypt', path: '/tool_decrypt', component: importPage("Decrypt"), value: '加解密', },

]
