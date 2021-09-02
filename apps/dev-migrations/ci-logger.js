class CiLogger {
  logQueryError(error, query, parameters, queryRunner) {
    const sql = query + (parameters && parameters.length ? ' -- PARAMETERS: ' + this.stringifyParams(parameters) : '');
    console.log(`query failed:`, sql);
    console.log(`error:`, error);
  }
  logSchemaBuild(message, queryRunner) {
    console.log(message);
  }
  stringifyParams(parameters) {
    try {
      return JSON.stringify(parameters);
    } catch (error) {
      // most probably circular objects in parameters
      return parameters;
    }
  }
  logQuery(query, parameters, queryRunner) {}
  logQuerySlow(time, query, parameters, queryRunner) {}
  logMigration(message, queryRunner) {}
  log(level, message, queryRunner) {}
}

module.exports = CiLogger;
