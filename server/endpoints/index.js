const goatsApi = require('./goats')
const rootApi = require('./root')

// Register each router by priority, first matching route wins
module.exports = (app, config) => {
  goatsApi(app, config)
  // rootApi is a catch all thus should be last
  // to be able to reach goatsApi
  rootApi(app, config)
}
