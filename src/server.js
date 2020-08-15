import path from 'path';
//import './src/env';

//import { prisma } from '../prisma/generated/prisma-client';
//import passport from 'passport';
//import { authenticateJwt } from './src/passport';
//import { isAuthenticated } from './src/middlewares';
import dotenv from 'dotenv';
dotenv.config();

const createError = require('http-errors');
const express = require('express');
const expressPlayground = require('graphql-playground-middleware-express').default

const cors = require('cors')

// 미들웨어


// var expressErrorHandler = require('express-error-handler');

// routing
var index = require('../routes/index');
var cafe_admin= require('../routes/cafe_admin');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


const { graphqlHTTP } = require('express-graphql');

var indexRouter = require('../routes/index');
//var usersRouter = require('./routes/users');
//var apiRouter = require('./routes/api');
import schema from './schema.js';

const app = express();

// use playground
app.get('/playground', expressPlayground({ endpoint: '/graphql' }))

app.disable('etag');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//  context: {prisma, authenticateJwt},
app.use(logger('dev'));
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
//app.use(authenticateJwt);
app.use(cors()) // enable `cors` to set HTTP response header: Access-Control-Allow-Origin: *

app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.use('/script', express.static(path.join(__dirname, 'script')));


//라우팅 부분
app.use('/', index);
app.use('/cafe_admin', cafe_admin);
//app.use('/api', apiRouter);

var root = { hello: () => 'Hello world!' };


app.use('/graphql', graphqlHTTP( async(request, response, graphQLParams) => ({
    schema: schema,
    context: (request),

  rootValue: root,
  graphiql: true
  })),
);



//let PORT = process.env.PORT || 4000;
app.listen(process.env.PORT || 3001);
module.exports = app;



