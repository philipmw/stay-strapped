import { Signal } from './signal';
import { readFileSync } from './workout';

const A = [
  150,
  150,
  150
];

const B = [
  140,
  140,
  150,
  150,
  150,
  160,
  170
];

const C = readFileSync('./test_data/2k.csv')
  .map((o) => o.hr);

describe('Signal', () => {
  describe('hash', () => {
    it('works for A', () => {
      expect(new Signal(A).hash()).toBe('150,150,150');
    })
  });

  describe('#score', () => {
    it('works for empty', () => {
      expect(new Signal([]).score()).toBe(0);
    });

    it('works for A', () => {
      expect(new Signal(A).score()).toBe(30);
    });

    it('works for first three elements of B', () => {
      expect(new Signal(B.slice(0, 3)).score()).toBeCloseTo(-10.41);
    });

    it('works for B', () => {
      expect(new Signal(B).score()).toBeCloseTo(49.22);
    });

    it('works for C', () => {
      expect(new Signal(C).score()).toBeCloseTo(2033.18);
    });
  });
});

