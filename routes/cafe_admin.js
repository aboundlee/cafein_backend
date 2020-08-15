var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var path = process.cwd(); // 루트경로

var getConnection = require(path + '/config/db_connect.js');

/* Get home page */

router.get('/', function(req, res, next){
    res.render('/index', {title: 'Express'});
 
});




router.post('/create', function(req, res, next){
  data = req.body;
  /* 데이터 받는 형식 예외처리하기 */ 

  let params = [data.name, data.lat, data.lon, data.busy, data.outlet, data.seat, data.area, data.noise];
  let sql = 'INSERT INTO cafe VALUE (?, ?, ?, ?, ?, ?, ?, ?)';


  getConnection((conn) => {
	  conn.query(sql , params, (err, result2) => {
		try {
		  if (err) throw err;
		  console.log('insert success');
		}
		catch {
		  if (err.code == "ER_DUP_ENTRY"){
			console.log ("This data is already in the Databases");
		  }
		  else { console.log(err); }
		}
		res.redirect('/');
	  });
	  conn.release();
  });


});



router.post('/delete', function(req, res, next){
  data = req.body; 

  /* 데이터 받는 형식 예외처리하기 */ 

  console.log(data);

  let params = [data.name, data.lat, data.lon, data.busy, data.outlet, data.seat, data.area, data.noise]
  let sql = 'INSERT INTO cafe VALUE (?, ?, ?, ?, ?, ?, ?, ?)';

  getConnection((conn) => {
	  conn.query(sql, params, (err, result) => {
		if (err) throw err;
		  console.log('insert success');
		  res.redirect('/');
	  });
      conn.release();
  });
});



module.exports = router;



