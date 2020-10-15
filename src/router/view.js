import { importPage } from '../utils'

// 页面路由
export default () => [
	{ path: '/info_cdn', component: importPage("CdnDetect") },
	{ path: '/info_waf', component: importPage("WafCheck") },
	{ path: '/info_email', component: importPage("EmailGather") },
	{ path: '/info_subdomain', component: importPage("SubDomain") },
	{ path: '/info_whois', component: importPage("Whois") },

	{ path: '/exp_jboss_scan', component: importPage("JBossScan"), },
	{ path: '/exp_jboss_shell', component: importPage("JBossShell") },

	{ path: '/exp_jenkins_check', component: importPage("JenkinsCheck"), },
	{ path: '/exp_jenkins_shell', component: importPage("JenkinsShell") },

	{ path: '/tool_url', component: importPage("UrlGather") },
	{ path: '/tool_md5', component: importPage("Md5Query") },
	{ path: '/tool_pwd', component: importPage("PwdGenerator") },
	{ path: '/tool_decrypt', component: importPage("Decrypt") },

]
