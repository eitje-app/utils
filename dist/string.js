'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.snakeToCamel = snakeToCamel;
exports.camelize = camelize;
exports.truncateString = truncateString;
exports.capitalize = capitalize;
exports.titleCase = titleCase;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var urlPattern = /(https?:\/\/|www\.)[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/=]*[-a-zA-Z0-9@:%_\+~#?&\/=])*/ig;

function snakeToCamel(s) {
  return s.replace(/(\_\w)/g, function (m) {
    return m[1].toUpperCase();
  });
}

function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '');
}

function truncateString(str, num) {
  var addPoints = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  var _ref = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
      canBeLink = _ref.canBeLink;

  if (!str) return "";
  var isSmall = false;
  num = isSmall ? num - 6 : num;
  if (num < 0) num = 0;
  if (canBeLink) {
    var links = str.match(urlPattern) || [];
    var linkEnd = links.reduce(function (tally, l) {
      var idxEnd = str.indexOf(l) + l.length;
      return idxEnd > tally ? idxEnd : tally;
    }, 0);

    num = linkEnd > num ? linkEnd : num;
  }

  if (num < str.length) {
    return str.slice(0, num) + (addPoints ? "..." : "");
  } else {
    return str;
  }
}

function capitalize(str) {
  if (!_lodash2.default.isString(str)) return str;
  if (str.length === 0) return str;
  return str[0].toUpperCase() + str.substring(1);
}

function titleCase(str) {
  return str.toLowerCase().split(' ').filter(Boolean).map(function (word) {
    return word.replace(word[0], word[0].toUpperCase());
  }).join(' ');
}