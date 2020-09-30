let zmq = undefined
try {
	zmq = require('zeromq')
} catch (error) {
	zmq = window.require('zeromq')
}

const _reqhost = "tcp://127.0.0.1:5555";
const _subhost = "tcp://127.0.0.1:50505";
let ishas = true;

class ZmqJs {
	constructor() {
		console.log("shell constructor")
		this.reqthost = _reqhost;
		this.subhost = _subhost;
	}

	async Check(parameters) {
		const sock = new zmq.Request
		sock.connect(this.reqthost)
		console.log(parameters)

		var text = JSON.stringify(parameters);
		console.log(JSON.parse(text))
		await sock.send(text)

		const [result] = await sock.receive()
		var auth = result.toString().toLowerCase()
		var hasAuth = auth === 'true'
		console.log(hasAuth)
		return hasAuth;
	}
	async Subscribe(uid, handleResult) {
		const sock = new zmq.Subscriber

		sock.connect(this.subhost)
		sock.subscribe()
		console.log("Subscriber connected")

		while (ishas) {
			const [topic, msg] = await sock.receive()
			handleResult(topic.toString())
		}
		sock.unsubscribe();
		console.log("Subscriber disconnected")
	}
}

// var task = {
// 	id: "023feac1-4a5d-49c9-b540-8cac4241c99a",
// 	scriptid: "cdn_detect",
// 	parameters: { url: 'http://www.4dogs.cn/' },
// };

// let _zmq = new ZmqJs();
// if (_zmq.Check(task)) {
// 	_zmq.Subscribe(task.id, (topic) => {
// 		console.log("this ia public data");
// 		console.log(topic);
// 		var index = topic.indexOf(',');
// 		var id = topic.substring(0, index - 1).trim();
// 		var json = topic.substring(index + 1).trim();

// 		if (json.startsWith("{") && json.endsWith("}")) {
// 			console.log(json);

// 		}
// 		else if (json == "end!!!") {
// 			ishas = false;
// 			console.log("ishas = false ")
// 		}
// 		else if (json.StartsWith("error_")) {

// 		}

// 	});
// }

// start zmq client
export default ZmqJs;