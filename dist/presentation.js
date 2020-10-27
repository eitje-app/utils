"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var formatMoney = exports.formatMoney = function formatMoney(num) {
    var decPlaces = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
    var thouSeparator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ".";
    var decSeparator = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : ",";

    var n = num,
        sign = n < 0 ? "-" : "",
        i = parseInt(n = Math.abs(+n || 0).toFixed(decPlaces)) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return sign + (j ? i.substr(0, j) + thouSeparator : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thouSeparator) + (decPlaces ? decSeparator + Math.abs(n - i).toFixed(decPlaces).slice(2) : "");
};