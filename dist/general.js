'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exists = exists;
exports.add = add;
exports.isPresent = isPresent;
exports.reduceObjects = reduceObjects;
exports.round = round;
exports.reduceObject = reduceObject;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function exists(item) {
  if (!item) return false;
  if (_lodash2.default.isString(item)) {
    return item.replace(/\s/g, '').length > 0;
  }
  return !item.length || item.length > 0;
}

function add(tally, item) {
  return tally + item;
}

function isPresent(field) {
  return field === 0 ? true : !!field;
}

function reduceObjects(data) {
  return data.reduce(reduceObject, {});
}

function round(num) {
  var places = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

  if (!num) return num;

  return Number(Number(num).toFixed(places));
}

function reduceObject(tally, item) {
  var keys = Object.keys(item);
  keys.forEach(function (k) {
    if (!tally[k]) tally[k] = 0;

    if (_lodash2.default.isNumber(item[k])) {
      tally[k] += item[k];
    }
  });
  return tally;
}