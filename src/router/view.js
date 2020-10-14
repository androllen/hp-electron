import { importPage } from '../utils'

// 页面路由
export default () => [
	{ path: '/info_cdn', component: importPage("CdnDetect") },
	{ path: '/info_waf', component: importPage("WafCheck") },
	{ path: '/info_email', component: importPage("EmailGather") },
	{ path: '/info_subdomain', component: importPage("SubDomain") },
	{ path: '/info_whois', component: importPage("Whois") },

	{ path: '/exp_jboss', component: importPage("JBossScan") },
	{ path: '/exp_website', component: importPage("BruteForce") },

	{ path: '/tool_url', component: importPage("UrlGather") },
	{ path: '/tool_md5', component: importPage("Md5Query") },
	{ path: '/tool_pwd', component: importPage("PwdGenerator") },
	{ path: '/tool_decrypt', component: importPage("Decrypt") },

]
