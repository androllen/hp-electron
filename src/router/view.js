import { importPage } from '../utils'

// 页面路由
export default () => [
	{ name: 'CdnDetect', path: '/info_cdn', component: importPage("CdnDetect") },
	{ name: 'WafCheck', path: '/info_waf', component: importPage("WafCheck") },
	{ name: 'EmailGather', path: '/info_email', component: importPage("EmailGather") },
	{ name: 'SubDomain', path: '/info_subdomain', component: importPage("SubDomain") },
	{ name: 'Whois', path: '/info_whois', component: importPage("Whois") },

	{ name: 'JBossScan', path: '/exp_jboss_scan', component: importPage("JBossScan"), },
	{ name: 'JBossShell', path: '/exp_jboss_shell', component: importPage("JBossShell") },

	{ name: 'JenkinsCheck', path: '/exp_jenkins_check', component: importPage("JenkinsCheck"), },
	{ name: 'JenkinsShell', path: '/exp_jenkins_shell', component: importPage("JenkinsShell") },

	{ name: 'UrlGather', path: '/tool_url', component: importPage("UrlGather") },
	{ name: 'Md5Query', path: '/tool_md5', component: importPage("Md5Query") },
	{ name: 'PwdGenerator', path: '/tool_pwd', component: importPage("PwdGenerator") },
	{ name: 'Decrypt', path: '/tool_decrypt', component: importPage("Decrypt") },

]
