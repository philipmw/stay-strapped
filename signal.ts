import {stddev} from './math';

export class Signal {
  a: number[];
  private hash_: string; // cache
  private score_: number; // cache

  constructor(a) {
    this.a = a;
  }

  hash(): string {
    if (this.hash_ != null) {
      return this.hash_;
    } else {
      return this.hash_ = this.a.toString();
    }
  }

  score(): number {
    if (this.score_ != null) {
      return this.score_;
    } else {
      return this.score_ = this.a.length - 15 * stddev(this.a);
    }
  }

  concat(cache: SignalCache, ...a): Signal {
    return cache.build(this.a.concat(...a));
  }

  static max(...intervals: Signal[]): Signal {
    return intervals.reduce((acc, val) => {
      if (val.score() > acc.score()) {
        return val;
      } else {
        return acc;
      }
    });
  }
}

export class SignalCache {
  cache: object;
  hits: number;
  misses: number;

  constructor() {
    this.cache = {};
    this.hits = 0;
    this.misses = 0;
  }

  build(a: number[]): Signal {
    const signal = new Signal(a);
    if (this.cache[signal.hash()]) {
      this.hits++;
      return this.cache[signal.hash()];
    } else {
      this.misses++;
      return this.cache[signal.hash()] = new Signal(a);
    }
  }
}

export class NoSignal extends Signal {
  constructor() {
    super([]);
  }

  score(): number {
    return -99999;
  }
}

