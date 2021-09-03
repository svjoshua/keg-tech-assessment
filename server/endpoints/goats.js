const { apiErr, apiResponse } = require('./handler')
const { GoatService } = require('../libs/goatsLib')
const goatService = new GoatService()

const getGoats = (app, config) => async (req, res) => {
  try {
    const goats = await goatService.goatFacts()
    return apiResponse(req, res, goats, 200)
  }
  catch (err) {
    return apiErr(req, res, err, 400)
  }
}

module.exports = async (app, config) => {
  // link the goatService to our connected mongodb instance
  await goatService.initDb(app.get('db'))

  // Gets a list of goat facts
  app.get('/goats', getGoats(app, config))

  return app
}
