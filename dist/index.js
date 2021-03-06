"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _graphqlRequest = require("graphql-request");

var _default = function _default(authorizationServiceUrl) {
  return (
    /*#__PURE__*/
    function () {
      var _ref = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(resolve, root, args, context, info) {
        var gqlOperation, authorizationToken, token, _ref2, hasUserPermission;

        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                gqlOperation = info.operation;
                authorizationToken = context && context.headers && context.headers.authorization || context && context.request && context.request.headers && context.request.headers.authorization;
                token = authorizationToken && authorizationToken.includes('Bearer ') ? authorizationToken.replace('Bearer ', '') : authorizationToken;
                _context.next = 5;
                return (0, _graphqlRequest.request)(authorizationServiceUrl, "\n    query($token: String, $isUserAnonymous: Boolean, $gqlOperation: Json!) {\n      hasUserPermission(token: $token  isUserAnonymous: $isUserAnonymous gqlOperation: $gqlOperation)\n    }\n    ", (0, _objectSpread2.default)({}, token ? {
                  token: token
                } : {
                  isUserAnonymous: true
                }, {
                  gqlOperation: gqlOperation
                }));

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