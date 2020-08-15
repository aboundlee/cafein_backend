"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _prismaClient = require("./../../../../prisma/generated/prisma-client");

var _default = {
  Query: {
    allCafes: function allCafes(_, args) {
      return _prismaClient.prisma.cafes();
    }
  }
};
exports["default"] = _default;