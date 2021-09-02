const CiLogger = require('./ci-logger');
const dotenvPath = {
  development: './.env.dev',
  staging: './.env.staging',
  production: './.env.production',
  test: './.env.test',
  ci: './.env.ci',
}
const path = dotenvPath[process.env.NODE_ENV]
require('dotenv').config({path})
console.log(`${path} file loaded`)


module.exports = [
  {
    type: 'postgres',
    url: process.env.DB_URL,
    extra: {
      min: 1,
      max: 30
    },
    //logging: true, //ignored by TypeOrm migration commands(MigrationRunCommand.ts)
    logger: process.env.NODE_ENV === 'ci' ? new CiLogger() : 'advanced-console',
    migrations: ['src/*.ts', 'src/*/*.ts'],
    migrationsTable: 'migrations',
    cli: {
      migrationsDir: 'src'
    }
  }
]
