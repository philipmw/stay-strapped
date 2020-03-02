"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var math_1 = require("./math");
var Signal = /** @class */ (function () {
    function Signal(a) {
        this.a = a;
    }
    Signal.prototype.hash = function () {
        if (this.hash_ != null) {
            return this.hash_;
        }
        else {
            return this.hash_ = this.a.toString();
        }
    };
    Signal.prototype.score = function () {
        if (this.score_ != null) {
            return this.score_;
        }
        else {
            return this.score_ = this.a.length - 15 * math_1.stddev(this.a);
        }
    };
    Signal.prototype.concat = function (cache) {
        var _a;
        var a = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            a[_i - 1] = arguments[_i];
        }
        return cache.build((_a = this.a).concat.apply(_a, a));
    };
    Signal.max = function () {
        var intervals = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            intervals[_i] = arguments[_i];
        }
        return intervals.reduce(function (acc, val) {
            if (val.score() > acc.score()) {
                return val;
            }
            else {
                return acc;
            }
        });
    };
    return Signal;
}());
exports.Signal = Signal;
var SignalCache = /** @class */ (function () {
    function SignalCache() {
        this.cache = {};
        this.hits = 0;
        this.misses = 0;
    }
    SignalCache.prototype.build = function (a) {
        var signal = new Signal(a);
        if (this.cache[signal.hash()]) {
            this.hits++;
            return this.cache[signal.hash()];
        }
        else {
            this.misses++;
            return this.cache[signal.hash()] = new Signal(a);
        }
    };
    return SignalCache;
}());
exports.SignalCache = SignalCache;
var NoSignal = /** @class */ (function (_super) {
    __extends(NoSignal, _super);
    function NoSignal() {
        return _super.call(this, []) || this;
    }
    NoSignal.prototype.score = function () {
        return -99999;
    };
    return NoSignal;
}(Signal));
exports.NoSignal = NoSignal;
