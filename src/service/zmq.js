let zmq = require('zeromq')
const _reqhost = "tcp://127.0.0.1:5555";
const _subhost = "tcp://127.0.0.1:50505";

class ZmqJs {
  constructor() {
    this.reqthost = _reqhost;
    this.subhost = _subhost;
    console.log("shell constructor")
  }

  async HandleSend(args, handleResult) {
    const req_sock = new zmq.Request;
    req_sock.connect(this.reqthost);
    var text = JSON.stringify(args);
    await req_sock.send(text)
    const [result] = await req_sock.receive()
    var auth = result.toString().toLowerCase()
    var hasAuth = auth === 'true'
    console.log("request complete")

    if (hasAuth) {
      const sub_sock = new zmq.Subscriber
      sub_sock.connect(this.subhost)
      sub_sock.subscribe(args.id)
      console.log("Subscriber connected")

      while (true) {
        const [topic, msg] = await sub_sock.receive()
        // 回调函数
				handleResult(topic.toString())
      }
      // sub_sock.unsubscribe();
      // sub_sock.close();
    }
  }

}

ZmqJs.getInstance = (function () {
  let instance
  return function () {
    if (!instance) {
      instance = new ZmqJs();
    }
    return instance;
  }
})()

// var task = {
// 	id: "023feac1-4a5d-49c9-b540-8cac4241c99a",
// 	scriptid: "cdn_detect",
// 	parameters: { url: 'http://www.4dogs.cn/' },
// };

// var add = ZmqJs.getInstance()
// add.HandleSend(task, topic => {
// 	console.log("this ia public data");
// 	var index = topic.indexOf(",");
// 	var id = topic.substring(0, index - 1).trim();
// 	var json = topic.substring(index + 1).trim();

// 	if (json.startsWith("{") && json.endsWith("}")) {
// 		var obj = JSON.parse(json);
// 		console.log(obj);
// 		return true;
// 	} else if (json == "end!!!") {
// 		return false;
// 	} else if (json.StartsWith("error_")) {
// 	}
// })




// start zmq client
export default ZmqJs.getInstance();