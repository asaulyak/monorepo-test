import {guid} from '@oapi-mono/uuid';
import {DbService, User} from '@oapi-mono/orm';

(async () => {
  DbService.create();
  const users = (await User.find()) as User[];
  console.log('users');

  users.forEach(user => {
    console.log(user.id);
  });
  console.error('Started dev-ui server', guid());
})();
