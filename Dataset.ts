import { Signal, NoSignal, SignalCache } from './signal';
// This file implements the algorithm described here:
// https://cs.stackexchange.com/questions/99972/algorithm-to-find-non-overlapping-intervals-that-minimize-standard-deviation

const SIGNAL_CACHE = new SignalCache();

export class Dataset {
  a: number[];
  minIntervalSize: number;
  f_: Signal[];

  constructor(a: number[], minIntervalSize: number) {
    this.a = a;
    this.minIntervalSize = minIntervalSize;
    this.f_ = new Array(a.length);
  }

// Returns the maximum sum of scores achievable by any set of non-overlapping intervals
// on the sub-problem consisting of just the first `i` of `x` that places the final (i-th)
// element inside an interval.
  g(i): Signal {
    if (i < this.minIntervalSize) {
      return new NoSignal();
    } else {
      return Signal.max(
        Array.from(Array(i).keys()).reduce((maxSoFar: Signal, j) => {
          const v = this.f(j).concat(SIGNAL_CACHE, this.a.slice(j, i));
          if (v.score() > maxSoFar.score()) {
            return v;
          } else {
            return maxSoFar;
          }
        }, SIGNAL_CACHE.build([]))
      );
    }
  }

// Returns the maximum sum of scores achievable by any set of non-overlapping intervals
// on the sub-problem consisting of just the first `i` elements of `x`.
  f(i): Signal {
    if (this.f_[i]) {
      return this.f_[i];
    }
    else if (i == 0) {
      return this.f_[i] = SIGNAL_CACHE.build([]);
    } else {
      return this.f_[i] = Signal.max(this.g(i), this.f(i - 1));
    }
  }

  signal(): Signal {
    return this.f(this.a.length);
  }
}