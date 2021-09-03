const { uuid } = require('@keg-hub/jsutils')

module.exports = {
  api: {
    origins: ['*'],
    port: 5005,
    host: '0.0.0.0',
    uuid: uuid(),
    dbUrl: 'mongodb://mongo:27017',
    dbName: 'goats',
    dbCollection: 'goat_facts'
  },
  web: {
    port: 3000,
    host: '0.0.0.0',
  },
}
