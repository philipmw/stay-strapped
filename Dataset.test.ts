import { Dataset } from './Dataset';
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

describe('Dataset', () => {
  describe('(A, 3)', () => {
    const ds = new Dataset(A, 3);

    describe('#g', () => {
      it('returns full list for i=5', () => {
        expect(ds.g(5).a).toStrictEqual([150, 150, 150]);
      });
    });

    describe('#f', () => {
      it('returns full list for i=5', () => {
        expect(ds.f(5).a).toStrictEqual([150, 150, 150]);
      });
    });
  });

  describe('(B, 3)', () => {
    const ds = new Dataset(B, 3);

    describe('#g', () => {
      it('returns [150,150,150] for i=10', () => {
        expect(ds.g(10).a).toStrictEqual([150, 150, 150]);
      });
    });

    describe('#f', () => {
      it('returns no signal for i=1', () => {
        expect(ds.f(1).a).toStrictEqual([]);
      });

      it('returns no signal for i=2', () => {
        expect(ds.f(2).a).toStrictEqual([]);
      });

      it('returns no signal for i=3', () => {
        expect(ds.f(3).a).toStrictEqual([]);
      });

      it('returns [150,150] for i=4', () => {
        expect(ds.f(4).a).toStrictEqual([150, 150]);
      });

      it('returns [150,150,150] for i=10', () => {
        expect(ds.f(10).a).toStrictEqual([150, 150, 150]);
      });
    });
  });

  describe('(C, 3)', () => {
    const ds = new Dataset(C, 3);

    describe('#signal', () => {
      it('returns expected signal', () => {
        expect(ds.signal().score()).toBe(1000);
      })
    });
  });
});