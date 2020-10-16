var dns = require('dns');

// dns.lookup('www.github.com', function onLookup(err, address, family) {
// 	console.log('ip 地址:', address);
// });

const dnslookup = (data, callback) => {
	dns.lookup(data, callback)
}

export { dnslookup }