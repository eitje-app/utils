'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeArrayOfObjects = exports.alwaysDefinedArray = exports.alwaysArray = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.getMax = getMax;
exports.getMin = getMin;
exports.findAndReplace = findAndReplace;
exports.toggle = toggle;
exports.getIdsFromItems = getIdsFromItems;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getMax(collection) {
  var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'updated_at';

  var items = collection.filter(function (a) {
    return a[key];
  });
  if (items.length === 0) return null;
  return items.reduce(function (a, b) {
    return a[key] > b[key] ? a : b;
  });
}

function getMin(collection) {
  var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'updated_at';

  var items = collection.filter(function (a) {
    return a[key];
  });
  if (items.length === 0) return null;
  return items.reduce(function (a, b) {
    return a[key] > b[key] ? b : a;
  });
}

function findAndReplace() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$oldItems = _ref.oldItems,
      oldItems = _ref$oldItems === undefined ? [] : _ref$oldItems,
      _ref$newItems = _ref.newItems,
      newItems = _ref$newItems === undefined ? [] : _ref$newItems,
      _ref$oldIden = _ref.oldIden,
      oldIden = _ref$oldIden === undefined ? "id" : _ref$oldIden,
      _ref$newIden = _ref.newIden,
      newIden = _ref$newIden === undefined ? "id" : _ref$newIden,
      mapFunc = _ref.mapFunc;

  if (newItems.length === 0) return oldItems;
  var items = oldItems.map(function (a) {
    return Object.assign({}, a);
  }); // deep-clone because we don't want to mess with life

  newItems.forEach(function (newItem) {
    var oldItem = items.find(function (i) {
      return i[oldIden] === newItem[newIden];
    });
    if (oldItem) {
      var idx = items.indexOf(oldItem);
      var combinedItem = _extends({}, oldItem, newItem);
      if (mapFunc) {
        combinedItem = mapFunc({ combined: combinedItem, old: oldItem, newItem: newItem });
      }

      items[idx] = combinedItem;
    } else {
      items.push(newItem);
    }
  });
  return items;
}

var alwaysArray = exports.alwaysArray = function alwaysArray(item) {
  return _lodash2.default.isArray(item) ? item : [item];
};
var alwaysDefinedArray = exports.alwaysDefinedArray = function alwaysDefinedArray(item) {
  return alwaysArray(item).filter(function (i) {
    return !!i;
  });
};

var mergeArrayOfObjects = exports.mergeArrayOfObjects = function mergeArrayOfObjects(arr1, arr2) {
  var field = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "id";
  return arr1.map(function (i) {
    var other = arr2.find(function (i2) {
      return i2[field] === i[field];
    });
    return other ? _extends({}, i, other) : i;
  });
};

function toggle(arr, nieuw) {
  arr = _lodash2.default.cloneDeep(arr);
  if (arr.includes(nieuw)) {
    arr = arr.filter(function (item) {
      return item !== nieuw;
    });
  } else {
    arr.push(nieuw);
  }
  return arr;
}

function getIdsFromItems(ids, items) {
  return ids.filter(function (id) {
    return items.some(function (item) {
      return item.id === id;
    });
  });
}