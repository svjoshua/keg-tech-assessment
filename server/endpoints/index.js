const goatsApi = require('./goats')
const rootApi = require('./root')

// Register each router by priority, first matching route wins
module.exports = (app, config) => {
  goatsApi(app, config) // goatsApi endpoints defined before catch all
  rootApi(app, config)
}
