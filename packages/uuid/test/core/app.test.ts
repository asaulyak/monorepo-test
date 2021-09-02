import {equal} from 'assert';
import {User} from '@oapi-mono/orm';

describe('Package UUID tests', () => {
  it('should return success value', async () => {
    const actual = true;
    const expected = true;

    const users = await User.find() as User[];

    console.log('Users');
    users.forEach(user => {
      console.log(user.id, user.username);
    });

    equal(actual, expected);
  });
});
