import { mean, stddev } from './math';

const FEMALE_FULMARS_MR = [727.7, 1086.5, 1091, 1361.3, 1490.5, 1956.1];

describe('mean()', () => {
  it('works for 1,2,3,4', () => {
    expect(mean([1, 2, 3, 4])).toBe(2.5);
  });

  it('works for female fulmars', () => {
    expect(mean(FEMALE_FULMARS_MR)).toBeCloseTo(1285.52);
  });
});

describe('stddev()', () => {
  it('works for 1,1,1,1', () => {
    expect(stddev([1, 1, 1, 1,])).toBe(0);
  });

  it('works for female fulmars', () => {
    expect(stddev(FEMALE_FULMARS_MR)).toBeCloseTo(420.96);
  });
});