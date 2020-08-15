"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mergeGraphqlSchemas = require("merge-graphql-schemas");

var _path = _interopRequireDefault(require("path"));

var _graphqlTools = require("graphql-tools");

var allTypes = (0, _mergeGraphqlSchemas.fileLoader)(_path["default"].join(__dirname, "./api/**/*.graphql"));
var allResolvers = (0, _mergeGraphqlSchemas.fileLoader)(_path["default"].join(__dirname, "./api/**/*.js")); // api 폴더 안에 모든 폴더에 모든 js(resolver) 파일을 불러온다.

var schema = (0, _graphqlTools.makeExecutableSchema)({
  typeDefs: (0, _mergeGraphqlSchemas.mergeTypes)(allTypes),
  resolvers: (0, _mergeGraphqlSchemas.mergeResolvers)(allResolvers)
}); // schema 변수에 typeDefs, resolvers를 정의하여 담아주고 그것을 export 해준다.

var _default = schema;
exports["default"] = _default;