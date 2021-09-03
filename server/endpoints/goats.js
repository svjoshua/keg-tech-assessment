const { apiErr, apiResponse } = require('./handler')
const { initGoats, goatFacts, GoatService } = require('../libs/goatsLib')
const goatService = new GoatService()

const getGoats = (app, config) => async (req, res) => {
  try {
    // let goats = await goatFacts(app)
    let goats = await goatService.goatFacts()
    return apiResponse(req, res, goats, 200)
  }
  catch (err) {
    return apiErr(req, res, err, 400)
  }
}

module.exports = async (app, config) => {
  // initializes the goats db collection
  // await initGoats(app.get('db'))
  await goatService.initDb(app.get('db'))
  // Gets a list of goat facts
  app.get('/goats', getGoats(app, config))

  return app
}
