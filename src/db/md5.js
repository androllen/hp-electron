const path = require('path');
let md5Sqlite = require('sqlite3').verbose();
const dbPath = path.join(__static, 'md5.db');
let db;

export function initDB() {
  if (!db) {
    try {
      console.log(dbPath);
      db = new md5Sqlite.Database(dbPath);
      console.log('create ok');
    } catch (error) {
      console.log('error' + error);
    }
    console.log('create end');
  }
}

function queryData(sql, callback) {
  initDB();

  try {
    db.all(sql, (err, rows) => {
      if (null != err) {
        printErrorInfo(err);
        return;
      }
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
}

export function GetMd532(params, dataDeal) {
  let querySql = 'SELECT * FROM md5 WHERE md5_32=' + "'" + params + "'";
  console.log(querySql);
  queryData(querySql, dataDeal);
}


// init()
// GetMd516('ac59075b964b0715');

