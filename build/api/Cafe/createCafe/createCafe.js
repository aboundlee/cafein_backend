"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _prismaClient = require("./../../../../prisma/generated/prisma-client");

var _default = {
  Mutation: {
    createCafe: function () {
      var _createCafe = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, args) {
        var cafename, address, lat, lng, franchise;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                cafename = args.cafename, address = args.address, lat = args.lat, lng = args.lng, franchise = args.franchise;
                _context.prev = 1;
                return _context.abrupt("return", _prismaClient.prisma.createCafe({
                  cafename: cafename,
                  address: address,
                  lat: lat,
                  lng: lng,
                  franchise: franchise
                }));

              case 5:
                _context.prev = 5;
                _context.t0 = _context["catch"](1);
                console.log(_context.t0);
                return _context.abrupt("return", null);

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 5]]);
      }));

      function createCafe(_x, _x2) {
        return _createCafe.apply(this, arguments);
      }

      return createCafe;
    }()
  }
};
exports["default"] = _default;