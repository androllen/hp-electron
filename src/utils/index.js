// 异步加载页面组件
const importPage = view => () =>
  import(
    /* webpackChunkName: "group-targe" */
    `../views/modules/${view}.vue`
	)
	
//生成随机 GUID 数
const GUID = () => {
	function S4() {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	}
	return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

export {
	importPage,
	GUID
}