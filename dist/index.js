'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _presentation = require('./presentation');

var presentation = _interopRequireWildcard(_presentation);

var _date = require('./date');

var date = _interopRequireWildcard(_date);

var _string = require('./string');

var string = _interopRequireWildcard(_string);

var _collections = require('./collections');

var collections = _interopRequireWildcard(_collections);

var _general = require('./general');

var general = _interopRequireWildcard(_general);

var _number = require('./number');

var number = _interopRequireWildcard(_number);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = _extends({}, date, string, collections, general, number, presentation);

// ...UI, ...string, ...collections, ...general, ...dev, ...number

//