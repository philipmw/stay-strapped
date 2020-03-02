"use strict";
exports.__esModule = true;
function mean(a) {
    return a.reduce(function (acc, val) { return acc + val; }, 0) / a.length;
}
exports.mean = mean;
function stddev(a) {
    return Math.sqrt(1.0 / (a.length - 1) * a.reduce(function (acc, val) { return acc + Math.pow(val - mean(a), 2); }, 0));
}
exports.stddev = stddev;
