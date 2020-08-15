var path = process.cwd();
var mysql = require('mysql');
var dbconfig = require(path + '/config/db_config.js');


var pool = mysql.createPool(dbconfig);
function getConnection(callback) {

  pool.getConnection(function (err, conn) {
    if(!err) {
      callback(conn);
    }
  });
}

module.exports = getConnection;
