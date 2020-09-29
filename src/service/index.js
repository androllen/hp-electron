const _reqhost = "tcp://127.0.0.1:5554";
const _subhost = "tcp://127.0.0.1:50504";

var path = require('path');
const util = require('util');
const execFile = util.promisify(require('child_process').execFile);

//https://www.cnblogs.com/fger/p/11994968.html
//http://nodejs.cn/api/child_process.html
//mklink /d TXThrift D:\4Dogs\V3.0_TX\TXThrift
//start zmq server 
export async function getShell() {
	var abcpath = path.join(__dirname, '../../');
	let dirpath = path.join(abcpath, 'TXThrift', 'TX_WIN_VENV', 'python3.exe');
	console.log(dirpath);
	let pypath = path.join(abcpath, 'TXThrift', 'TX_Py3', 'server.py');
	console.log(pypath);
	const { stdout } = await execFile(dirpath, [pypath, '-r', _reqhost, '-s', _subhost]);
	console.log(stdout);
}

async function getVersion() {
	var abcpath = path.join(__dirname, '../../');
	let dirpath = path.join(abcpath, 'TXThrift', 'TX_WIN_VENV', 'python3.exe');
	console.log(dirpath);
	const { stdout } = await execFile(dirpath, ['--version']);
	console.log(stdout);
}
// getShell()