// import * as typeorm from 'typeorm';

import * as pgTypes from 'pg';

const types = pgTypes.types;

// tslint:disable-next-line:no-console
console.info(
  '\x1b[33m%s\x1b[0m',
  'REWRITED BASE NUMERIC TYPE FOR POSTGRES TYPES: return float instead of string - orm/typeorm.ts',
);
// 1700 - numeric id, convert all numeric values to float
types.setTypeParser(1700, (v: string) => (v ? parseFloat(v) : v));

export * from 'typeorm';
