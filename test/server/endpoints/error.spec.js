const axios = require('axios')
const { api: apiConfig } = require('../../../configs/server.config')
const { initApi } = require('../../../server/server')

jest.mock('../../../server/libs/goatsLib.js')

describe("testing-goat-facts-api-error", () => {

    let appServer
    beforeAll(() => {
        process.env['TEST_ERROR'] = true
        appServer = initApi()
    })

    afterAll(() => {
        appServer.then(apps => {
            apps.server.close()
        })
    })

     // Check that we can receive the expected error handling data
     it("GET /goats - errorHandling", async () => {
        await axios.get(`${apiConfig.baseUrl}/goats`)
            .catch(error => {
                expect(error.response.data.status).toBe(400)
                expect(error.response.data.error.message).toBe("Cannot read properties of null (reading 'length')")
                expect(error.response.statusText).toBe('Bad Request')
            })
    })
})
