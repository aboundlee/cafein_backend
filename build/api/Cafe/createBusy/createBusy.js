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
    createBusy: function () {
      var _createBusy = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, args, request) {
        var cafeId, dayOfTheWeek, time, busyness, validDayOfWeek, cafe, existingBusy, busy;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                cafeId = args.cafeId, dayOfTheWeek = args.dayOfTheWeek, time = args.time, busyness = args.busyness;
                _context.prev = 1;
                validDayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; // dayOfTheWeek 데이터 형태체크 

                if (validDayOfWeek.includes(dayOfTheWeek)) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt("return", false);

              case 5:
                _context.next = 7;
                return _prismaClient.prisma.cafe({
                  id: cafeId
                });

              case 7:
                cafe = _context.sent;

                if (cafe) {
                  _context.next = 10;
                  break;
                }

                return _context.abrupt("return", false);

              case 10:
                _context.next = 12;
                return _prismaClient.prisma.$exists.busy({
                  AND: [{
                    cafeId: cafe.id
                  }, {
                    dayOfTheWeek: dayOfTheWeek
                  }, {
                    time: time
                  }]
                });

              case 12:
                existingBusy = _context.sent;
                console.log(dayOfTheWeek);
                console.log(time);

                if (!existingBusy) {
                  _context.next = 17;
                  break;
                }

                return _context.abrupt("return", false);

              case 17:
                _context.next = 19;
                return _prismaClient.prisma.createBusy({
                  cafe: {
                    connect: {
                      id: cafe.id
                    }
                  },
                  cafeId: cafe.id,
                  dayOfTheWeek: dayOfTheWeek,
                  time: time,
                  busyness: busyness
                });

              case 19:
                busy = _context.sent;
                return _context.abrupt("return", true);

              case 23:
                _context.prev = 23;
                _context.t0 = _context["catch"](1);
                console.log(_context.t0);
                return _context.abrupt("return", false);

              case 27:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 23]]);
      }));

      function createBusy(_x, _x2, _x3) {
        return _createBusy.apply(this, arguments);
      }

      return createBusy;
    }()
  }
};
exports["default"] = _default;