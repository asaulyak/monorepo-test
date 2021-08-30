import {guid} from '@oapi-mono/uuid';

export default class StatusController {
  public async handle() {
    return `OK ${guid()}`;
  }
}
