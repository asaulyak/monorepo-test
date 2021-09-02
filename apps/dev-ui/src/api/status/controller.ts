import {guid} from '@oapi-mono/uuid';
import {User} from '@oapi-mono/orm';

export default class StatusController {
  public async handle() {
    const users = await User.find();
    return `OK ${guid()} ${users}`;
  }
}
