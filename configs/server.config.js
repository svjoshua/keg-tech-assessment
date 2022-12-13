const { uuid } = require('@keg-hub/jsutils')

module.exports = {
  api: {
    origins: ['http://localhost:3000'],  //needed to add localhost here to correct COR issue
    port: 5005,
    host: '0.0.0.0',
    uuid: uuid(),
  },
  web: {
    port: 3000,
    host: '0.0.0.0',
  },
}
