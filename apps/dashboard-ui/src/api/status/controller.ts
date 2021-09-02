import {tomorrow} from '@oapi-mono/date';

export default class StatusController {
  public async handle() {
    return `OK ${tomorrow.format()}`;
  }
}
