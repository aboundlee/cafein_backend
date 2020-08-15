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
    createOpeningHours: function () {
      var _createOpeningHours = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, args, request) {
        var cafeId, dayOfTheWeek, open, close, validDayOfWeek, cafe, existingOpeningHours, openingHours;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                cafeId = args.cafeId, dayOfTheWeek = args.dayOfTheWeek, open = args.open, close = args.close;
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
                return _prismaClient.prisma.$exists.openingHours({
                  AND: [{
                    cafeId: cafe.id
                  }, {
                    dayOfTheWeek: dayOfTheWeek
                  }]
                });

              case 12:
                existingOpeningHours = _context.sent;
                console.log(existingOpeningHours);

                if (!existingOpeningHours) {
                  _context.next = 16;
                  break;
                }

                return _context.abrupt("return", false);

              case 16:
                _context.next = 18;
                return _prismaClient.prisma.createOpeningHours({
                  cafe: {
                    connect: {
                      id: cafe.id
                    }
                  },
                  cafeId: cafe.id,
                  dayOfTheWeek: dayOfTheWeek,
                  open: open,
                  close: close
                });

              case 18:
                openingHours = _context.sent;
                return _context.abrupt("return", true);

              case 22:
                _context.prev = 22;
                _context.t0 = _context["catch"](1);
                console.log(_context.t0);
                return _context.abrupt("return", false);

              case 26:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 22]]);
      }));

      function createOpeningHours(_x, _x2, _x3) {
        return _createOpeningHours.apply(this, arguments);
      }

      return createOpeningHours;
    }()
  }
};
exports["default"] = _default;