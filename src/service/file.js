const fs = window.require('fs');

export function writeFile(path, buffer, callback) {
	fs.writeFile(path, buffer, function (err) {
		if (err) {
			return callback(err);
		}
		return callback(null);
	})
}