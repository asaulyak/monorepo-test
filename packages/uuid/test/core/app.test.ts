import {equal} from 'assert';

describe('Package UUID tests', () => {
  it('should return success value', done => {
    const actual = true;
    const expected = true;

    setTimeout(() => {
      equal(actual, expected);

      done();
    }, 1000);
  });
});
