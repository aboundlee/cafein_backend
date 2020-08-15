
/*
require('dotenv').config({
  path : "../secret/mysql_secret.env"
});
*/
//var db_config = require('../secret/mysql_secret.json');

//console.log(db_config);

module.exports = {

	  host     : 'localhost',
	  //user     : process.env.MYSQL_USER,
	  //password : process.env.MYSQL_PASSWD,
	  //user     : db_config.MYSQL_USER,
      //password : db_config.MYSQL_PASSWD,
      user     : 'root',
      password : 'cafe22nn',
	  port     : 3306,
	  database : 'cafebusy'
};
