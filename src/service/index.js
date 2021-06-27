const _reqhost = "tcp://127.0.0.1:5555";
const _subhost = "tcp://127.0.0.1:50505";

const { join, dirname } = require('path');
const util = require('util');
const execFile = util.promisify(require('child_process').execFile);

//https://www.cnblogs.com/fger/p/11994968.html
//http://nodejs.cn/api/child_process.html
//mklink /d TXThrift D:\github\V3.0_TX\TXThrift
//start zmq server 
export async function getShell() {
	console.log('dirname', __dirname);
	let _basePath = join(dirname(__dirname), 'TXThrift');

	let _venv = join(_basePath, 'TX_WIN_VENV', 'python3.exe');
	console.log(_venv);

	let _py = join(_basePath, 'TX_Py3', 'server.py');
	console.log(_py);

	const { stdout } = await execFile(_venv, [_py, '-r', _reqhost, '-s', _subhost]);
	console.log(stdout);
}