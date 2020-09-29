let zmq = undefined
try {
	zmq = require('zeromq')
} catch (error) {
	zmq = window.require('zeromq')
}

const _reqhost = "tcp://127.0.0.1:5555";
const _subhost = "tcp://127.0.0.1:50505";
class ZmqJs {
	//定义构造方法 
	//https://zeromq.org/languages/nodejs/
	constructor() {
		console.log("shell constructor")
		this.reqthost = _reqhost;
		this.subhost = _subhost;
	}
	async Add() {
		return 'hi';
	}
	async Check(parameters) {
		const sock = new zmq.Request
		sock.connect(this.reqthost)
		console.log(this.reqthost)
		var text = JSON.stringify(parameters);
		console.log(JSON.parse(text))
		await sock.send(text)

		const [result] = await sock.receive()

		result = eval(result.toLowerCase())
		result = JSON.parse(result);
		console.log(result)
		return result;
	}

	async Subscribe(parameters, callback) {
		const sock = new zmq.Subscriber

		sock.connect(this.subhost)
		sock.subscribe(parameters)
		console.log("Subscriber connected")
		const [result] = await sock.receive()

		for await (const [topic, msg] of sock) {
			console.log("received a message related to:", topic, "containing message:", msg)
		}
		callback(topic.toString())
		sock.close()
	}

}

//启动 zmq 客户端
export default ZmqJs;