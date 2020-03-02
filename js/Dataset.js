"use strict";
exports.__esModule = true;
var signal_1 = require("./signal");
// This file implements the algorithm described here:
// https://cs.stackexchange.com/questions/99972/algorithm-to-find-non-overlapping-intervals-that-minimize-standard-deviation
var SIGNAL_CACHE = new signal_1.SignalCache();
var Dataset = /** @class */ (function () {
    function Dataset(a, minIntervalSize) {
        this.a = a;
        this.minIntervalSize = minIntervalSize;
        this.f_ = new Array(a.length);
    }
    // Returns the maximum sum of scores achievable by any set of non-overlapping intervals
    // on the sub-problem consisting of just the first `i` of `x` that places the final (i-th)
    // element inside an interval.
    Dataset.prototype.g = function (i) {
        var _this = this;
        if (i < this.minIntervalSize) {
            return new signal_1.NoSignal();
        }
        else {
            return signal_1.Signal.max(Array.from(Array(i).keys()).reduce(function (maxSoFar, j) {
                var v = _this.f(j).concat(SIGNAL_CACHE, _this.a.slice(j, i));
                if (v.score() > maxSoFar.score()) {
                    return v;
                }
                else {
                    return maxSoFar;
                }
            }, SIGNAL_CACHE.build([])));
        }
    };
    // Returns the maximum sum of scores achievable by any set of non-overlapping intervals
    // on the sub-problem consisting of just the first `i` elements of `x`.
    Dataset.prototype.f = function (i) {
        if (this.f_[i]) {
            return this.f_[i];
        }
        else if (i == 0) {
            return this.f_[i] = SIGNAL_CACHE.build([]);
        }
        else {
            return this.f_[i] = signal_1.Signal.max(this.g(i), this.f(i - 1));
        }
    };
    Dataset.prototype.signal = function () {
        return this.f(this.a.length);
    };
    return Dataset;
}());
exports.Dataset = Dataset;
