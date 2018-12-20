"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _graphqlRequest = require("graphql-request");

var _default = function _default(authorizationServiceUrl) {
  return (
    /*#__PURE__*/
    function () {
      var _ref = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(resolve, root, args, context, info) {
        var gqlOperation, idToken, _ref2, hasUserPermission;

        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                gqlOperation = info.operation;

                if (!context.request.headers.authorization) {
                  _context.next = 9;
                  break;
                }

                idToken = context.request.headers.authorization.includes('Bearer ') ? context.request.headers.authorization.replace('Bearer ', '') : context.request.headers.authorization;
                _context.next = 5;
                return (0, _graphqlRequest.request)(authorizationServiceUrl, "\n      query($idToken: String!, $gqlOperation: Json!) {\n        hasUserPermission(idToken: $idToken gqlOperation: $gqlOperation)\n      }\n      ", {
                  idToken: idToken,
                  gqlOperation: gqlOperation
                });

              case 5:
                _ref2 = _context.sent;
                hasUserPermission = _ref2.hasUserPermission;

                if (!hasUserPermission) {
                  _context.next = 9;
                  break;
                }

                return _context.abrupt("return", resolve(root, args, context, info));

              case 9:
                throw Error('User hasn\'t permissions.');

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function (_x, _x2, _x3, _x4, _x5) {
        return _ref.apply(this, arguments);
      };
    }()
  );
};

exports.default = _default;