const { uuid } = require('@keg-hub/jsutils')

const apiPort = process.env.API_PORT || 5005
const uiPort = process.env.UI_PORT || 3000

const apiBaseUrl = process.env.API_BASE_URL || `http://localhost:${apiPort}`
const apiOrigin = process.env.API_ORIGIN || `http://localhost:${uiPort}`

module.exports = {
  api: {
    origins: [apiOrigin],
    port: apiPort,
    host: '0.0.0.0',
    uuid: uuid(),
    baseUrl: apiBaseUrl,
  },
  web: {
    port: uiPort,
    host: '0.0.0.0',
  },
}
