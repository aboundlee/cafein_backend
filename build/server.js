"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _path = _interopRequireDefault(require("path"));

var _schema = _interopRequireDefault(require("./schema.js"));

//import './src/env';
//import { prisma } from '../prisma/generated/prisma-client';
//import passport from 'passport';
//import { authenticateJwt } from './src/passport';
//import { isAuthenticated } from './src/middlewares';
var createError = require('http-errors');

var express = require('express');

var expressPlayground = require('graphql-playground-middleware-express')["default"];

var cors = require('cors'); // 미들웨어
// var expressErrorHandler = require('express-error-handler');
// routing


var index = require('../routes/index');

var cafe_admin = require('../routes/cafe_admin');

var bodyParser = require('body-parser');

var cookieParser = require('cookie-parser');

var logger = require('morgan');

var graphqlHTTP = require('express-graphql');

var indexRouter = require('../routes/index'); //var usersRouter = require('./routes/users');
//var apiRouter = require('./routes/api');


var app = express(); // use playground

app.get('/playground', expressPlayground({
  endpoint: '/graphql'
}));
app.disable('etag'); // view engine setup

app.set('views', _path["default"].join(__dirname, 'views'));
app.set('view engine', 'jade'); //  context: {prisma, authenticateJwt},

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express["static"](_path["default"].join(__dirname, 'public'))); //app.use(authenticateJwt);

app.use(cors()); // enable `cors` to set HTTP response header: Access-Control-Allow-Origin: *

app.use('/', indexRouter); //app.use('/users', usersRouter);

app.use('/script', express["static"](_path["default"].join(__dirname, 'script'))); //라우팅 부분

app.use('/', index);
app.use('/cafe_admin', cafe_admin); //app.use('/api', apiRouter);

var root = {
  hello: function hello() {
    return 'Hello world!';
  }
};
app.use('/graphql', graphqlHTTP( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(request, response, graphQLParams) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", {
              schema: _schema["default"],
              context: request,
              rootValue: root,
              graphiql: true
            });

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}())); //let PORT = process.env.PORT || 4000;

var PORT = 3001;
app.listen(PORT, function () {
  console.log('server start PORT ' + PORT);
});
module.exports = app;