import {before} from 'mocha';
import {ConnectionConfig, DbService} from '@oapi-mono/orm';
import * as process from 'process';

before(async function() {
  this.timeout(40000);
  // init DB service
  await ConnectionConfig.create()
    .patchConfigOption({
      url: process.env.DB_URL,
      logging: true,
    })

  await DbService.create().connect();
});
