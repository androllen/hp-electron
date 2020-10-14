const path = require('path');
let md5Sqlite = require('sqlite3').verbose();
const dbPath = path.join(__static, 'sql.db');
let db;

function init() {
	if (!db) {
		try {
			console.log(dbPath);
			db = new md5Sqlite.Database(dbPath);
			console.log('create ok');
		} catch (error) {
			console.log('dirname');
			console.log(error);
		}
		console.log('create end');
	}
}

function queryData(sql, callback) {
	init();

	try {
		db.all(sql, function (err, rows) {
			if (null != err) {
				printErrorInfo(err);
				return;
			}
			console.log('entry db');
			if (callback) {
				callback(rows);
			}
		});
	} catch (error) {
		console.log('entry db error');
	}
}

function printErrorInfo(params) {
	console.log(params);
}

export function GetMd516(params, dataDeal) {
	let querySql = 'SELECT * FROM md5 WHERE md5_16=' + "'" + params + "'";
	console.log(querySql);
	queryData(querySql, dataDeal);

	// queryData(querySql, (objects) => {
	// 	console.log('begin deal');
	// 	for (let i = 0; i < objects.length; ++i) {
	// 		console.log(objects[i]);
	// 	}
	// });
}

export function GetMd532(params, dataDeal) {
	let querySql = 'SELECT * FROM md5 WHERE md5_32=' + "'" + params + "'";
	console.log(querySql);
	queryData(querySql, dataDeal);
}

function dataDeal(objects) {
	console.log('begin deal');
	for (let i = 0; i < objects.length; ++i) {
		console.log(objects[i]);
	}
}

// init()
// GetMd516('ac59075b964b0715');

