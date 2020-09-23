// 异步加载页面组件
export const importPage = view => () =>
  import(
    /* webpackChunkName: "group-targe" */
    `../views/modules/${view}.vue`
	)
	
//生成随机 GUID 数
export const GUID = () => {
	function S4() {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	}
	return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

// https://stackoverflow.com/questions/9514179/how-to-find-the-operating-system-version-using-javascript
export const importWindow =()=>{
  
  var OSName = "Unknown";
  if (window.navigator.userAgent.indexOf("Windows NT 10.0") != -1)
    OSName = "Windows 10";
  if (window.navigator.userAgent.indexOf("Windows NT 6.2") != -1)
    OSName = "Windows 8";
  if (window.navigator.userAgent.indexOf("Windows NT 6.1") != -1)
    OSName = "Windows 7";
  if (window.navigator.userAgent.indexOf("Windows NT 6.0") != -1)
    OSName = "Windows Vista";
  if (window.navigator.userAgent.indexOf("Windows NT 5.1") != -1)
    OSName = "Windows XP";
  if (window.navigator.userAgent.indexOf("Windows NT 5.0") != -1)
    OSName = "Windows 2000";
  if (window.navigator.userAgent.indexOf("Mac") != -1)
    OSName = "Mac/iOS";
  if (window.navigator.userAgent.indexOf("X11") != -1)
    OSName = "UNIX";
  if (window.navigator.userAgent.indexOf("Linux") != -1)
    OSName = "Linux";

  return OSName;
}
