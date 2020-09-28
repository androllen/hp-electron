const _reqhost = "tcp://127.0.0.1:5555";
const _subhost = "tcp://127.0.0.1:50505";

const { join, dirname } = require('path');
const util = require('util');
const execFile = util.promisify(require('child_process').execFile);

//https://www.cnblogs.com/fger/p/11994968.html
//http://nodejs.cn/api/child_process.html
//启动 zmq 服务端
export async function getShell() {
	let dirpath = join(dirname(__dirname), 'txpy', 'server.py');
	console.log(dirpath);
	const { stdout } = await execFile('python', [dirpath, '-r', _reqhost, '-s', _subhost]);
	console.log(stdout);
}

// 暴露静态资源
// export const loadPython = () => {
// 	getShell()
// }

// export default {
// 	getShell
// }

