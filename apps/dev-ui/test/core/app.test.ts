import {equal} from 'assert';

describe('App dev-ui tests', () => {
  it('should return success value', done => {
    const actual = true;
    const expected = true;

    setTimeout(() => {
      equal(actual, expected);

      done();
    }, 1000);
  });
});
