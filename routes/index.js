var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var fs = require('fs');
var path = process.cwd(); // 루트경로
var getConnection = require(path + '/config/db_connect.js');

/* Get home page */

router.get('/', function(req, res, next){
    res.render('/index', {title: 'Express'});
});

router.post('/getdata20', function(req, res, next){

	try {
		getConnection((conn) => {
			conn.query('SELECT * from cafe', function(err, data){
				if (err) throw err;
				console.log('the solution is ', data);
				res.send(data);
				conn.release();
			});
		});
	} catch (e) {
		console.log(e);

	}
});

router.post('/getcafes', function(req, res, next){

	try {
		getConnection((conn) => {
			conn.query('SELECT * from cafe', function(err, data){
				if (err) throw err;
				console.log('the solution is ', data);
				res.send(data);
				conn.release();
			});
		});
	} catch (e) {
		console.log(e);

	}
});

module.exports = router;



