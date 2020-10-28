'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatDate = exports.inTimeRange = exports.getCurrentMonth = exports.getCurrentYear = exports.roundTime = exports.timeStringToDate = exports.getMonthDays = exports.totalMins = exports.minSince = exports.getWholeWeekString = exports.getWholeWeekArray = exports.getWeekDatesFromDate = exports.makeHourDate = exports.getDate = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.humanDate = humanDate;
exports.fullHumanDate = fullHumanDate;
exports.getDateFromWeek = getDateFromWeek;
exports.isAfterDate = isAfterDate;
exports.today = today;
exports.todayOrEarlier = todayOrEarlier;
exports.inPast = inPast;
exports.highest = highest;
exports.secondsToTimeString = secondsToTimeString;
exports.timeStringToMin = timeStringToMin;
exports.minToTimeString = minToTimeString;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getDate = exports.getDate = function getDate() {
  var hours = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

  var date = new Date();
  date.setHours(hours, 0, 0, 0);
  return date;
};

var makeHourDate = exports.makeHourDate = function makeHourDate(mins) {
  var str = minToTimeString(mins);

  var _str$split = str.split(":"),
      _str$split2 = _slicedToArray(_str$split, 2),
      hours = _str$split2[0],
      minutes = _str$split2[1];

  var date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
};

var getWeekDatesFromDate = exports.getWeekDatesFromDate = function getWeekDatesFromDate(date) {
  var d = (0, _moment2.default)(date);
  var week = d.isoWeek();
  var year = d.isoWeekYear();
  return getWholeWeekArray(week, year);
};

var getWholeWeekArray = exports.getWholeWeekArray = function getWholeWeekArray(week, year) {
  var datesArr = [];
  var dagen = days();
  (0, _lodash2.default)(7).times(function (n) {
    datesArr.push(getDateFromWeek(n + 1, week, year).format("YYYY-MM-DD"));
  });
  return datesArr;
};

var getWholeWeekString = exports.getWholeWeekString = function getWholeWeekString(week, year) {
  var datesArr = [];
  var dagen = days();
  (0, _lodash2.default)(7).times(function (n) {
    datesArr.push({ date: getDateFromWeek(n + 1, week, year).format("YYYY-MM-DD") });
  });
  return datesArr;
};

var minSince = exports.minSince = function minSince(start) {
  return (0, _moment2.default)().diff((0, _moment2.default)(start), 'm');
};

function humanDate(date) {
  return (0, _moment2.default)(date).format("dddd DD MMM");
}

function fullHumanDate(date) {
  return (0, _moment2.default)(date).format("dddd DD MMM YYYY");
}

function getDateFromWeek(day, week, year) {
  var mmt = (0, _moment2.default)();

  mmt.isoWeekday(day).isoWeek(week);
  mmt.isoWeekYear(year);
  return mmt;
};

function isAfterDate(date) {
  var dateTwo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (0, _moment2.default)();

  return getDayDiff(date, dateTwo) >= 0;
}

function getDayDiff(date) {
  var dateTwo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (0, _moment2.default)();

  date = (0, _moment2.default)(date);
  dateTwo = (0, _moment2.default)(dateTwo);
  dateTwo = dateTwo.startOf('day');
  var diff = date.startOf('day').diff(dateTwo, 'd');
  return diff;
}

function today() {
  return (0, _moment2.default)().format("YYYY-MM-DD");
}

function todayOrEarlier(date) {
  return getDayDiff(date) <= 0;
}

function inPast(date) {
  return !isAfterDate(date);
}

var totalMins = exports.totalMins = function totalMins(string1, string2) {
  return (0, _moment2.default)(string2).diff((0, _moment2.default)(string1), 'minutes');
};

function highest(date1, date2) {
  if (!date2) return date1;
  if (!date1) return date2;
  if (date1 && date2) return date1 > date2 ? date1 : date2;
}

var getMonthDays = exports.getMonthDays = function getMonthDays(month, year) {
  var start = (0, _moment2.default)([year, month - 1, 1]);
  var startOfMonth = start.format("YYYY-MM-DD");
  var endOfMonth = start.endOf('month').format("YYYY-MM-DD");
  return { startOfMonth: startOfMonth, endOfMonth: endOfMonth };
};

var timeStringToDate = exports.timeStringToDate = function timeStringToDate(val) {
  var date = new Date();
  var vals = val.split(":");
  date.setHours(vals[0], vals[1], 0, 0);
  return date;
};

var roundTime = exports.roundTime = function roundTime(time) {
  var amt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  time = (0, _moment2.default)(time);
  var mod = time.minute() % amt;
  if (mod === 0) return time;
  var remainder = amt - mod;
  time.add(remainder, 'minutes');
  return time;
};

var getCurrentYear = exports.getCurrentYear = function getCurrentYear() {
  return (0, _moment2.default)().year();
};

var getCurrentMonth = exports.getCurrentMonth = function getCurrentMonth() {
  return (0, _moment2.default)().month() + 1;
}; // moment thinks january == 0

function secondsToTimeString(secs) {
  return new Date(secs * 1000).toISOString().substr(11, 8);
}

var inTimeRange = exports.inTimeRange = function inTimeRange(dateTime, hours) {
  var now = (0, _moment2.default)();
  return now.diff(dateTime, 'hours') <= hours;
};

var formatDate = exports.formatDate = function formatDate(date) {
  var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'DD-MM-YYYY';

  return (0, _moment2.default)(date).format(format);
};

function timeStringToMin() {
  var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "00:00";

  if (!_lodash2.default.isString(time)) {
    return 0;
  }
  var spT = time.split(":");
  var time1 = spT[0];
  var time2 = spT[1];
  return Number(time1) * 60 + Number(time2);
}

function minToTimeString(mins) {
  var abs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (!_index2.default.isPresent(mins)) return 'n/a';
  mins = Math.round(mins);
  var prefix = "";
  if (abs) {
    if (mins < 0) prefix = "-";
    mins = Math.abs(mins);
  }
  if (mins < 0) {
    mins = 0;
  }
  var mod = mins % 60;
  var hr;
  if (mod > 0) {
    hr = (mins - mod) / 60;
    if (hr < 10) {
      hr = '0' + hr;
    }
    if (mod < 10) {
      mod = '0' + mod;
    }
    return '' + prefix + hr + ':' + mod;
  } else {
    mod = mins / 60;
    if (mod < 10) {
      mod = '0' + mod;
    }
    return '' + prefix + mod + ':00';
  }
}