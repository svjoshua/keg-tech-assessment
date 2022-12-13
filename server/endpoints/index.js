const goatsApi = require('./goats')
const rootApi = require('./root')

// Register each router by priority, first matching route wins
module.exports = (app, config) => {
  //needed to change priority here. It was always defaulting to the rootApi with /*
  goatsApi(app, config)
  rootApi(app, config)
}
